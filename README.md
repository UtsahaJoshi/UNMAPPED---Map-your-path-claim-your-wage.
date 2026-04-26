# UNMAPPED: Transition Engine (Nepal 2026)

## 🌍 Project Purpose
**UNMAPPED** is a data-driven "Transition Engine" designed to bridge the gap between Nepal's informal workforce and the formal economy. By providing workers with a clear, validated roadmap from informal skills to formal occupations, the project aims to address the core economic challenge of Nepal: **doubling the per capita income from $1,500 to $3,000.**

### 📈 The $3,000 Vision: Is it Realistic?
Yes. By transitioning the informal workforce (which currently accounts for a significant portion of Nepal's GDP but remains excluded from formal wage protections and data) into formal ISCO-validated roles, we can:
- **Increase Wage Transparency**: Moving workers from an estimated 70% informal baseline to 100% formal NRB (Nepal Rastra Bank) standards.
- **Boost Productivity**: Formalization brings access to social security, banking, and credit, which in turn fuels small-business growth.
- **Capture "Missing" GDP**: Proper mapping of skills allows the government to tax and reinvest in the very sectors that are currently "unmapped."

## 📊 Data & Methodology
The engine is powered by two core datasets included in this repository:
1. **Nepal_Earnings_Occupation_FY2024_25.xlsx**: Real monthly earning data for major occupation groups in Nepal, compiled as of April 2026.
2. **ISCO-08 EN Structure and definitions.xlsx**: The International Standard Classification of Occupations, providing the formal definitions, tasks, and "Included/Excluded" lists used for our smart mapping.

### Smart Mapping Tiers:
- **Standard**: Direct match with formal titles.
- **Recognized**: Cross-referenced matches where a skill is excluded from one group but validated in another.
- **Identified**: Discovery of transition paths for previously unmapped informal roles.

## 🏛️ Government & World Bank Integration
UNMAPPED isn't just a dashboard; it's a policy tool:
- **Skill Logging**: When a user searches for a job that isn't currently mapped, the system logs the query. this data provides the **World Bank** and the **Nepal Government** with a real-time heat map of "new" informal roles that require formalization.
- **Targeted Training**: Local bodies can analyze the **Skill-Gap Checklist** (tasks users have or haven't ticked) to organize specific vocational training courses that directly address the workforce's weaknesses.
- **Actual Earning Data**: By collecting self-reported "Actual Earnings" from users, the platform provides the government with the most accurate data on the informal economy's true value.

## 🚀 How to Run
```bash
npm install
npm run dev
```

---
**PROJECT UNMAPPED // CHALLENGE 05 // NEPAL 2026**
*Map your path, claim your wage.*
