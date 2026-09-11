<div align="center">
  <img src="berserk.gif" alt="sword" width="300px" />
  <h1>📊 Siddhant | Data Analyst</h1>
  <p><strong>Turning raw data into actionable insights</strong></p>
  <img src="https://github-readme-streak-stats.herokuapp.com/?user=beepsid&theme=transparent&hide_border=true" alt="Siddhant's Streak" />
</div>

---

## 🎯 About Me

I'm a **Data Analyst** passionate about building data pipelines, crafting interactive dashboards, and uncovering patterns in complex datasets. Currently exploring the depths of **Power BI, DAX, and Python** to solve real-world business problems.

- 📊 **Currently**: Data Analyst at **Amlgo Labs**
- 🎓 **Education**: B.Tech in Computer Science at PSIT Kanpur (2021-2025)
- 🎯 **Focus Areas**: Power BI, DAX, Power Query, Python, Data Modeling, ETL
- 🏆 **Recent Wins**: 
  - Built end-to-end Power BI dashboard for 100K+ order Brazilian e-commerce dataset
  - Created BPO Call Center analytics simulation engine
  - Financial correlation analysis: Gold as portfolio safe haven
- 📫 **Reach me**: Discord: **senzaei** | LinkedIn: [siddzz](https://linkedin.com/in/siddzz/)

---

## 🛠️ Tech Stack

<div align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" height="40" alt="python logo"  />
  <img width="12" />
  <img src="https://www.vectorlogo.zone/logos/microsoft_powerbi/microsoft_powerbi-icon.svg" height="40" alt="power bi logo"  />
  <img width="12" />
  <img src="https://www.vectorlogo.zone/logos/mysql/mysql-icon.svg" height="40" alt="mysql logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" height="40" alt="postgresql logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" height="40" alt="pandas logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg" height="40" alt="jupyter logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" height="40" alt="github logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" height="40" alt="git logo"  />
</div>

**Core Skills:**
- **BI & Visualization**: Power BI, DAX, Power Query (M language)
- **Programming**: Python (Pandas, NumPy, Matplotlib, Seaborn)
- **Databases**: MySQL, PostgreSQL, Data Modeling
- **Analytics**: ETL, Data Cleaning, Statistical Analysis
- **Tools**: Jupyter Notebook, Git, Excel VBA

---

## 📈 Featured Projects

### 🛒 Olist Brazilian E-Commerce Analytics Dashboard
**Power BI | Data Modeling | DAX**
- Analyzed 100,000+ orders across 9 relational tables
- Built interactive 5-page dashboard with advanced DAX measures
- Resolved data quality issues: deduplication, missing values, broken joins
- **Impact**: Real-world dataset from Kaggle

### 📞 BPO Call Center Operations Analytics
**Python | Data Simulation | Analytics**
- Engineered Python simulation engine generating 50,000+ realistic call records
- Modeled Tech Support, Billing, and Retention departments
- Replicated production workflows with configurable variables

### 💰 Volatility Safe Haven Correlation Engine
**Python | Financial Analytics | Visualization**
- Analyzed 5 years of daily market data (Nifty 50 vs Gold)
- Built interactive dashboard analyzing gold as portfolio safe haven
- End-to-end financial data pipeline

---

## 🎮 **Play the Data Game!**

**Click the button below to collect data points and build your analytics empire!**

<div style="border: 2px solid #3498db; border-radius: 10px; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-align: center; font-family: 'Arial', sans-serif; margin: 20px 0;">
  
  <div style="font-size: 48px; margin: 10px 0;" id="dataPoints">0</div>
  <div style="font-size: 16px; margin-bottom: 15px;">Data Points Collected</div>
  
  <button onclick="collectData()" style="background: #fff; color: #667eea; border: none; padding: 12px 30px; font-size: 16px; font-weight: bold; border-radius: 5px; cursor: pointer; margin: 5px; transition: all 0.3s;">
    📊 Collect Data
  </button>
  
  <button onclick="autoCollect()" style="background: #2ecc71; color: white; border: none; padding: 12px 30px; font-size: 16px; font-weight: bold; border-radius: 5px; cursor: pointer; margin: 5px; transition: all 0.3s;" id="autoBtn">
    ⚡ Auto Collect (100pts)
  </button>
  
  <button onclick="resetGame()" style="background: #e74c3c; color: white; border: none; padding: 12px 30px; font-size: 16px; font-weight: bold; border-radius: 5px; cursor: pointer; margin: 5px; transition: all 0.3s;">
    🔄 Reset
  </button>
  
  <div style="margin-top: 15px; font-size: 14px; opacity: 0.9;">
    <div id="stats">
      <p>💾 Clicks: <span id="clicks">0</span></p>
      <p>⚙️ Auto Collectors: <span id="autoCount">0</span></p>
    </div>
  </div>
</div>

<script>
let dataPoints = 0;
let clicks = 0;
let autoCount = 0;
let autoInterval = null;

function collectData() {
  dataPoints += 1 + autoCount;
  clicks++;
  updateDisplay();
}

function autoCollect() {
  if (autoCount < 5) {
    autoCount++;
    updateDisplay();
    
    if (autoInterval) clearInterval(autoInterval);
    autoInterval = setInterval(() => {
      dataPoints += autoCount;
      updateDisplay();
    }, 1000);
  }
}

function resetGame() {
  dataPoints = 0;
  clicks = 0;
  autoCount = 0;
  if (autoInterval) clearInterval(autoInterval);
  updateDisplay();
}

function updateDisplay() {
  document.getElementById('dataPoints').textContent = dataPoints;
  document.getElementById('clicks').textContent = clicks;
  document.getElementById('autoCount').textContent = autoCount;
  document.getElementById('autoBtn').disabled = autoCount >= 5;
  document.getElementById('autoBtn').style.opacity = autoCount >= 5 ? '0.5' : '1';
}
</script>

---

## 💻 My Setup

| Component | Specs |
|:---:|---|
| **Laptop** | HP 15-ec2xxx |
| **OS** | Windows 11 Pro |
| **CPU** | AMD Ryzen 5600H |
| **GPU** | NVIDIA GeForce GTX 1650 + AMD Radeon |
| **RAM** | **16 GB DDR4 3200MHz** ⬆️ |
| **Storage** | 512 GB SK hynix BC711 SSD |

---

## 🏆 Certifications & Learning

- 🎖️ **Deloitte Australia** - Data Analytics Job Simulation (Jun 2026)
- 📚 **Meta Certifications** - Data Modeling, MySQL, Python, Databases
- 🔍 **Google** - The Arcade Base Camp (Sep 2024)
- 📊 **Microsoft** - PL-300: Power BI Data Analyst (In Progress)

---

## 📊 GitHub Stats

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=beepsid&theme=transparent&hide_border=true&show_icons=true" alt="GitHub Stats" />
</div>

---

## 🎵 Currently Exploring

> "Data is everywhere. The key is asking the right questions." 📊

Deeply diving into:
- 🎯 Advanced DAX patterns and performance optimization
- 🔄 ETL pipeline automation with Python
- 📈 Statistical modeling for business forecasting
- 💡 Real-world analytics problem-solving

---

<div align="center">
  <img src="kyubey.gif" width="100" alt="kyubey">
  <p><strong>Let's turn data into decisions!</strong> 🚀</p>
</div>
