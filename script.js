const $ = id => document.getElementById(id);

function randn() {
  let u = 0, v = 0;
  while (!u) u = Math.random();
  while (!v) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

function buildData() {
  const data = [];
  const start = new Date("2026-07-01T00:00:00");
  for (let i = 0; i < 500; i++) {
    let volume = Math.max(1500, 10000 + randn() * 2000);
    let latency = Math.max(15, 50 + randn() * 10);
    if (i >= 100 && i <= 105) latency = [250,260,300,280,290,275][i-100];
    if (i >= 350 && i <= 355) volume = [40000,42000,45000,41000,39000,43000][i-350];
    const ts = new Date(start.getTime() + i * 3600000);
    data.push({ts, volume, latency});
  }
  return data;
}

function detect(data) {
  const avgV = data.reduce((s,d)=>s+d.volume,0)/data.length;
  const avgL = data.reduce((s,d)=>s+d.latency,0)/data.length;
  const sdV = Math.sqrt(data.reduce((s,d)=>s+(d.volume-avgV)**2,0)/data.length);
  const sdL = Math.sqrt(data.reduce((s,d)=>s+(d.latency-avgL)**2,0)/data.length);
  return data.map(d => {
    const score = Math.sqrt(((d.volume-avgV)/sdV)**2 + ((d.latency-avgL)/sdL)**2);
    return {...d, anomaly: score > 3.0};
  });
}

let latencyChart, volumeChart;

function render() {
  const data = detect(buildData());
  const anomalies = data.filter(d=>d.anomaly);
  const total = data.reduce((s,d)=>s+d.volume,0);
  const avgLatency = data.reduce((s,d)=>s+d.latency,0)/data.length;
  const rate = anomalies.length/data.length*100;

  $("totalTrades").textContent = Math.round(total).toLocaleString();
  $("avgLatency").textContent = Math.round(avgLatency) + " ms";
  $("anomalyCount").textContent = anomalies.length;
  $("riskRate").textContent = rate.toFixed(1) + "%";
  $("ringValue").textContent = rate.toFixed(1) + "%";

  const labels = data.map(d => d.ts.toLocaleDateString("en-IN",{month:"short",day:"numeric"}) + " " + d.ts.getHours() + ":00");
  const common = {responsive:true,maintainAspectRatio:false,animation:false,plugins:{legend:{display:false}},scales:{x:{display:false},y:{grid:{color:"rgba(120,150,170,.08)"},ticks:{color:"#718590",font:{size:9}}}}};

  if(latencyChart) latencyChart.destroy();
  latencyChart = new Chart($("latencyChart"), {
    type:"line", data:{labels,datasets:[{data:data.map(d=>d.latency),borderColor:"#62a8ff",borderWidth:1.5,pointRadius:0,fill:true,backgroundColor:"rgba(98,168,255,.07)",tension:.2}]},
    options:common
  });
  if(volumeChart) volumeChart.destroy();
  volumeChart = new Chart($("volumeChart"), {
    type:"line", data:{labels,datasets:[{data:data.map(d=>d.volume),borderColor:"#39d98a",borderWidth:1.5,pointRadius:0,fill:true,backgroundColor:"rgba(57,217,138,.06)",tension:.2}]},
    options:common
  });

  $("anomalyTable").innerHTML = anomalies.slice(-12).reverse().map(d => `
    <tr>
      <td>${d.ts.toLocaleString("en-IN",{dateStyle:"medium",timeStyle:"short"})}</td>
      <td>${Math.round(d.volume).toLocaleString()}</td>
      <td>${Math.round(d.latency)} ms</td>
      <td class="risk-high">● High Risk</td>
    </tr>`).join("");
}

$("refreshBtn").addEventListener("click", render);
render();
