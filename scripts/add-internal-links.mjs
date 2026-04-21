import fs from "fs";
import path from "path";

const ROOT = path.join(process.cwd(), "src/content");

const linkMap = {
  "best-picks/best-air-purifiers-for-dust": [
    {title: "Best Air Purifiers for Allergies", href: "/best-picks/best-air-purifiers-for-allergies", description: "Our top-rated purifiers for pollen, pet dander, and dust mite allergens"},
    {title: "How to Reduce Dust in Your Home", href: "/guides/how-to-reduce-dust-in-your-home", description: "Practical tips beyond purifiers for cutting household dust"},
    {title: "HEPA Filters Explained", href: "/guides/hepa-filter-explained", description: "How True HEPA captures 99.97% of dust particles down to 0.3 microns"},
    {title: "Coway AP-1512HH Review", href: "/reviews/coway-airmega-ap1512hh-review", description: "Our #1 rated purifier for dust with 98% PM2.5 reduction in testing"},
  ],
  "best-picks/best-air-purifiers-for-mold-and-mildew": [
    {title: "Best Dehumidifiers for Basement", href: "/best-picks/best-dehumidifiers-for-basement", description: "Control moisture at the source to prevent mold growth"},
    {title: "Do I Need a Dehumidifier?", href: "/guides/do-i-need-a-dehumidifier", description: "When humidity control matters more than air purification for mold"},
    {title: "Humidity and Health", href: "/guides/humidity-and-health", description: "The ideal humidity range to prevent mold while staying comfortable"},
    {title: "IQAir HealthPro Plus Review", href: "/reviews/iqair-healthpro-plus-review", description: "Medical-grade filtration for severe mold and mildew sensitivity"},
  ],
  "best-picks/best-air-purifiers-for-smoke": [
    {title: "Best Purifiers for Wildfire Smoke", href: "/best-picks/best-air-purifiers-for-wildfire-smoke", description: "Specialized picks for wildfire season smoke infiltration"},
    {title: "Carbon Filters Explained", href: "/guides/carbon-filter-explained", description: "How activated carbon removes smoke odors and VOCs from the air"},
    {title: "Wildfire Smoke & Indoor Air", href: "/guides/wildfire-smoke-indoor-air", description: "Protecting your home air quality during wildfire season"},
    {title: "Blueair Blue Pure 211+ Review", href: "/reviews/blueair-blue-pure-211-review", description: "High-CADR purifier with excellent smoke particle removal"},
  ],
  "best-picks/best-air-purifiers-for-vocs": [
    {title: "VOCs in Your Home", href: "/guides/vocs-in-your-home", description: "Common sources of volatile organic compounds and their health effects"},
    {title: "Carbon Filters Explained", href: "/guides/carbon-filter-explained", description: "How activated carbon adsorbs VOCs, formaldehyde, and chemical fumes"},
    {title: "Dyson Big Quiet Review", href: "/reviews/dyson-big-quiet-review", description: "Catalytic formaldehyde destruction plus HEPA+carbon filtration"},
    {title: "Austin Air HealthMate Review", href: "/reviews/austin-air-healthmate-review", description: "15 lbs of activated carbon for heavy-duty chemical filtration"},
  ],
  "best-picks/best-air-purifiers-with-washable-filters": [
    {title: "Air Purifier Maintenance Guide", href: "/guides/air-purifier-maintenance-guide", description: "When and how to clean washable filters for peak performance"},
    {title: "Air Purifier Energy Costs", href: "/guides/air-purifier-energy-costs", description: "How washable filters reduce long-term operating costs"},
    {title: "HEPA Filters Explained", href: "/guides/hepa-filter-explained", description: "Washable pre-filters vs. disposable HEPA — what you need to know"},
    {title: "Best Air Purifiers Under $200", href: "/best-picks/best-air-purifiers-under-200", description: "Budget-friendly purifiers that save more with washable filters"},
  ],
  "best-picks/best-air-quality-monitors": [
    {title: "How to Test Home Air Quality", href: "/guides/how-to-test-home-air-quality", description: "Step-by-step guide to measuring PM2.5, VOCs, CO2, and radon at home"},
    {title: "AQI Explained", href: "/guides/air-quality-index-explained", description: "Understanding Air Quality Index readings and health categories"},
    {title: "Airthings View Plus Review", href: "/reviews/airthings-view-plus-review", description: "Our top-rated monitor tracking 7 air quality metrics including radon"},
    {title: "Best Portable Air Quality Monitors", href: "/best-picks/best-portable-air-quality-monitors", description: "Take-anywhere monitors for travel, offices, and spot-checking rooms"},
  ],
  "best-picks/best-dehumidifiers-for-basement": [
    {title: "Do I Need a Dehumidifier?", href: "/guides/do-i-need-a-dehumidifier", description: "Signs your basement humidity is too high and when to act"},
    {title: "Best Dehumidifiers for Crawl Space", href: "/best-picks/best-dehumidifiers-for-crawl-space", description: "Heavy-duty units for below-grade moisture control"},
    {title: "Humidity and Health", href: "/guides/humidity-and-health", description: "How excess basement moisture affects respiratory health"},
    {title: "Frigidaire 50-Pint Review", href: "/reviews/frigidaire-50-pint-review", description: "Our top-rated basement dehumidifier with built-in pump"},
  ],
  "best-picks/best-dehumidifiers-for-crawl-space": [
    {title: "Best Dehumidifiers for Basement", href: "/best-picks/best-dehumidifiers-for-basement", description: "Dehumidifier picks for finished and unfinished basements"},
    {title: "Do I Need a Dehumidifier?", href: "/guides/do-i-need-a-dehumidifier", description: "Assessing moisture levels and when a dehumidifier is essential"},
    {title: "Best Air Purifiers for Mold", href: "/best-picks/best-air-purifiers-for-mold-and-mildew", description: "Pair with a dehumidifier for comprehensive mold prevention"},
    {title: "Humidity and Health", href: "/guides/humidity-and-health", description: "Keeping your whole home at the ideal 30-50% humidity range"},
  ],
  "best-picks/best-humidifiers-for-bedroom": [
    {title: "Best Humidifiers Overall", href: "/best-picks/best-humidifiers", description: "Our full roundup of top humidifiers across all room sizes"},
    {title: "Humidity and Health", href: "/guides/humidity-and-health", description: "Why bedroom humidity matters for sleep quality and respiratory health"},
    {title: "Levoit LV600S Review", href: "/reviews/levoit-lv600s-review", description: "Smart humidifier with auto mode and 6L tank for all-night coverage"},
    {title: "Best Air Purifiers for Bedroom", href: "/best-picks/best-air-purifiers-for-bedroom", description: "Pair a humidifier with a quiet purifier for optimal sleep air quality"},
  ],
  "best-picks/best-humidifiers": [
    {title: "Humidity and Health", href: "/guides/humidity-and-health", description: "The science behind ideal humidity levels for health and comfort"},
    {title: "Best Humidifiers for Bedroom", href: "/best-picks/best-humidifiers-for-bedroom", description: "Quiet, overnight humidifiers specifically for sleep spaces"},
    {title: "Air Purifier vs. Humidifier", href: "/guides/air-purifier-vs-humidifier", description: "Which device you need — or whether you need both"},
    {title: "Canopy Humidifier Review", href: "/reviews/canopy-humidifier-review", description: "Our top-rated evaporative humidifier — no white dust, dishwasher-safe"},
  ],
  "best-picks/best-portable-air-quality-monitors": [
    {title: "Best Air Quality Monitors", href: "/best-picks/best-air-quality-monitors", description: "Full-size home monitors for comprehensive 24/7 tracking"},
    {title: "How to Test Home Air Quality", href: "/guides/how-to-test-home-air-quality", description: "What to measure and how to interpret your readings"},
    {title: "AQI Explained", href: "/guides/air-quality-index-explained", description: "Understanding what your portable monitor's AQI numbers mean"},
    {title: "Temtop M10 Review", href: "/reviews/temtop-m10-review", description: "Budget portable monitor with real-time PM2.5 and HCHO readings"},
  ],
  "best-picks/best-smart-air-purifiers": [
    {title: "Best Air Purifiers for Allergies", href: "/best-picks/best-air-purifiers-for-allergies", description: "Smart auto-mode purifiers that detect and respond to allergen spikes"},
    {title: "Air Purifier Energy Costs", href: "/guides/air-purifier-energy-costs", description: "How smart scheduling and auto-mode reduce electricity usage"},
    {title: "Levoit Core 400S Review", href: "/reviews/levoit-core-400s-review", description: "Smart purifier with laser PM2.5 sensor and VeSync app control"},
    {title: "Samsung Bespoke Cube Review", href: "/reviews/samsung-bespoke-cube-review", description: "SmartThings-connected purifier with wind-free air delivery"},
  ],
  "best-picks/best-whole-house-air-purifiers": [
    {title: "Air Purifier Sizing Guide", href: "/guides/air-purifier-sizing-guide", description: "Calculate the right CADR for your room or whole-home coverage"},
    {title: "Best Air Purifiers for Large Rooms", href: "/best-picks/best-air-purifiers-for-large-rooms", description: "High-CADR purifiers for open floor plans and big spaces"},
    {title: "Air Purifier Placement Guide", href: "/guides/air-purifier-placement-guide", description: "Where to position purifiers for maximum whole-home coverage"},
    {title: "Coway Airmega 400 Review", href: "/reviews/coway-airmega-400-review", description: "Dual-filter design covering up to 1,560 sq. ft."},
  ],
  "reviews/aircare-ma1201-review": [
    {title: "Best Humidifiers", href: "/best-picks/best-humidifiers", description: "See how the Aircare stacks up against our top humidifier picks"},
    {title: "Humidity and Health", href: "/guides/humidity-and-health", description: "Why whole-house humidity control matters for comfort and health"},
    {title: "Air Purifier vs. Humidifier", href: "/guides/air-purifier-vs-humidifier", description: "Which device you need — or whether you need both"},
  ],
  "reviews/airthings-view-plus-review": [
    {title: "Best Air Quality Monitors", href: "/best-picks/best-air-quality-monitors", description: "Our full roundup of top air quality monitors"},
    {title: "Radon in Your Home", href: "/guides/radon-in-your-home", description: "Why radon monitoring matters and how to interpret readings"},
    {title: "How to Test Home Air Quality", href: "/guides/how-to-test-home-air-quality", description: "A complete guide to measuring indoor pollutants"},
    {title: "Awair Element Review", href: "/reviews/awair-element-review", description: "A strong alternative with CO2, VOC, and PM2.5 tracking"},
  ],
  "reviews/aquaoasis-cool-mist-review": [
    {title: "Best Humidifiers", href: "/best-picks/best-humidifiers", description: "See all our top-rated humidifier picks"},
    {title: "Best Humidifiers for Bedroom", href: "/best-picks/best-humidifiers-for-bedroom", description: "Quiet overnight humidifiers for better sleep"},
    {title: "Humidity and Health", href: "/guides/humidity-and-health", description: "Ideal humidity levels for respiratory comfort"},
  ],
  "reviews/aranet4-home-review": [
    {title: "Best Air Quality Monitors", href: "/best-picks/best-air-quality-monitors", description: "Our full roundup including CO2-focused monitors"},
    {title: "How to Test Home Air Quality", href: "/guides/how-to-test-home-air-quality", description: "What to measure and how to interpret CO2 readings"},
    {title: "Airthings View Plus Review", href: "/reviews/airthings-view-plus-review", description: "Multi-sensor alternative with radon, PM2.5, and more"},
  ],
  "reviews/austin-air-healthmate-review": [
    {title: "Best Premium Air Purifiers", href: "/best-picks/best-premium-air-purifiers", description: "Top-tier purifiers for those who want the best filtration"},
    {title: "Carbon Filters Explained", href: "/guides/carbon-filter-explained", description: "How Austin Air's 15-lb carbon bed removes chemicals and VOCs"},
    {title: "Best Air Purifiers for VOCs", href: "/best-picks/best-air-purifiers-for-vocs", description: "Purifiers specifically rated for chemical and gas removal"},
    {title: "IQAir HealthPro Plus Review", href: "/reviews/iqair-healthpro-plus-review", description: "Another medical-grade option for comparison"},
  ],
  "reviews/bissell-air320-review": [
    {title: "Best Air Purifiers Under $200", href: "/best-picks/best-air-purifiers-under-200", description: "Budget purifiers with solid HEPA performance"},
    {title: "Best Air Purifiers for Pet Hair", href: "/best-picks/best-air-purifiers-for-pet-hair", description: "Bissell's pet-focused lineup and alternatives"},
    {title: "Air Purifier Sizing Guide", href: "/guides/air-purifier-sizing-guide", description: "Match CADR to your room size for optimal results"},
  ],
  "reviews/blueair-blue-pure-211-review": [
    {title: "Best Air Purifiers for Large Rooms", href: "/best-picks/best-air-purifiers-for-large-rooms", description: "High-CADR picks for open floor plans"},
    {title: "Levoit vs. Blueair", href: "/guides/levoit-vs-blueair", description: "Head-to-head comparison of two top purifier brands"},
    {title: "HEPA Filters Explained", href: "/guides/hepa-filter-explained", description: "How Blueair's HEPASilent technology compares to True HEPA"},
    {title: "Winix 5500-2 Review", href: "/reviews/winix-5500-2-review", description: "Strong value alternative at a similar price point"},
  ],
  "reviews/blueair-classic-605-review": [
    {title: "Best Whole-House Air Purifiers", href: "/best-picks/best-whole-house-air-purifiers", description: "Large-coverage purifiers for open floor plans"},
    {title: "Levoit vs. Blueair", href: "/guides/levoit-vs-blueair", description: "How Blueair compares to Levoit across the lineup"},
    {title: "Blueair Blue Pure 211+ Review", href: "/reviews/blueair-blue-pure-211-review", description: "Blueair's more affordable large-room option"},
  ],
  "reviews/dyson-ph04-review": [
    {title: "Best Humidifiers", href: "/best-picks/best-humidifiers", description: "How Dyson's combo compares to standalone units"},
    {title: "Air Purifier vs. Humidifier", href: "/guides/air-purifier-vs-humidifier", description: "When a combo unit makes sense vs. separate devices"},
    {title: "Dyson Big Quiet Review", href: "/reviews/dyson-big-quiet-review", description: "Dyson's flagship purifier-only model for comparison"},
    {title: "Humidity and Health", href: "/guides/humidity-and-health", description: "Why humidification matters for respiratory health"},
  ],
  "reviews/dyson-purifier-cool-tp07-review": [
    {title: "Best Smart Air Purifiers", href: "/best-picks/best-smart-air-purifiers", description: "App-connected purifiers with auto-sensing and scheduling"},
    {title: "Best Premium Air Purifiers", href: "/best-picks/best-premium-air-purifiers", description: "High-end purifiers for those who want the best"},
    {title: "Dyson Big Quiet Review", href: "/reviews/dyson-big-quiet-review", description: "Dyson's latest flagship with higher CADR and catalytic filter"},
    {title: "Air Purifier Energy Costs", href: "/guides/air-purifier-energy-costs", description: "Running costs for Dyson's fan-purifier combos"},
  ],
  "reviews/germguardian-ac5250pt-review": [
    {title: "Best Air Purifiers Under $100", href: "/best-picks/best-air-purifiers-under-100", description: "Budget HEPA purifiers that deliver real filtration"},
    {title: "HEPA vs. Ionic Air Purifier", href: "/guides/hepa-vs-ionic-air-purifier", description: "Understanding GermGuardian's UV-C technology claims"},
    {title: "Air Purifier Maintenance Guide", href: "/guides/air-purifier-maintenance-guide", description: "Filter replacement schedules and UV-C bulb care"},
  ],
  "reviews/hey-dewy-humidifier-review": [
    {title: "Best Humidifiers for Bedroom", href: "/best-picks/best-humidifiers-for-bedroom", description: "Compact bedside humidifiers for overnight use"},
    {title: "Best Humidifiers", href: "/best-picks/best-humidifiers", description: "Our full humidifier roundup across all sizes and types"},
    {title: "Humidity and Health", href: "/guides/humidity-and-health", description: "Why keeping skin and airways hydrated matters"},
  ],
  "reviews/hisense-70-pint-review": [
    {title: "Best Dehumidifiers for Basement", href: "/best-picks/best-dehumidifiers-for-basement", description: "Our top basement dehumidifier picks by capacity"},
    {title: "Do I Need a Dehumidifier?", href: "/guides/do-i-need-a-dehumidifier", description: "Signs your home humidity is too high"},
    {title: "Frigidaire vs. GE Dehumidifier", href: "/guides/frigidaire-vs-ge-dehumidifier", description: "How the big brands compare on performance and value"},
  ],
  "reviews/honeywell-hpa300-review": [
    {title: "Best Air Purifiers for Large Rooms", href: "/best-picks/best-air-purifiers-for-large-rooms", description: "High-CADR purifiers for big spaces"},
    {title: "Coway AP-1512HH Review", href: "/reviews/coway-airmega-ap1512hh-review", description: "Our #1 pick — quieter with lower filter costs"},
    {title: "Air Purifier Maintenance Guide", href: "/guides/air-purifier-maintenance-guide", description: "Managing Honeywell's higher filter replacement costs"},
    {title: "Air Purifier Sizing Guide", href: "/guides/air-purifier-sizing-guide", description: "Match the HPA300's 465 sq. ft. coverage to your room"},
  ],
  "reviews/iqair-airvisual-pro-review": [
    {title: "Best Air Quality Monitors", href: "/best-picks/best-air-quality-monitors", description: "All our top-rated monitors compared"},
    {title: "AQI Explained", href: "/guides/air-quality-index-explained", description: "Understanding the readings on your AirVisual Pro"},
    {title: "Airthings View Plus Review", href: "/reviews/airthings-view-plus-review", description: "A more affordable alternative with radon monitoring"},
  ],
  "reviews/keystone-kstad50b-review": [
    {title: "Best Dehumidifiers for Basement", href: "/best-picks/best-dehumidifiers-for-basement", description: "See all our top-rated basement dehumidifiers"},
    {title: "Do I Need a Dehumidifier?", href: "/guides/do-i-need-a-dehumidifier", description: "When and why a dehumidifier is worth the investment"},
    {title: "Frigidaire 50-Pint Review", href: "/reviews/frigidaire-50-pint-review", description: "Our top-rated 50-pint dehumidifier for comparison"},
  ],
  "reviews/levoit-core-300-review": [
    {title: "Best Air Purifiers Under $100", href: "/best-picks/best-air-purifiers-under-100", description: "Budget HEPA purifiers including the Core 300"},
    {title: "Levoit Core 400S Review", href: "/reviews/levoit-core-400s-review", description: "Levoit's smart upgrade with laser sensor and app control"},
    {title: "Levoit vs. Blueair", href: "/guides/levoit-vs-blueair", description: "How Levoit's lineup compares to Blueair"},
    {title: "HEPA Filters Explained", href: "/guides/hepa-filter-explained", description: "Understanding the H13 HEPA in the Core 300"},
  ],
  "reviews/levoit-core-400s-review": [
    {title: "Best Smart Air Purifiers", href: "/best-picks/best-smart-air-purifiers", description: "App-connected purifiers with auto-sensing"},
    {title: "Coway vs. Levoit", href: "/guides/coway-vs-levoit", description: "How the Core 400S compares to the Coway AP-1512HH"},
    {title: "Levoit Core 300 Review", href: "/reviews/levoit-core-300-review", description: "Levoit's budget alternative without smart features"},
    {title: "Air Purifier Sizing Guide", href: "/guides/air-purifier-sizing-guide", description: "Is the 400S's coverage right for your room?"},
  ],
  "reviews/levoit-vital-200s-review": [
    {title: "Best Air Purifiers for Allergies", href: "/best-picks/best-air-purifiers-for-allergies", description: "Our top allergy purifier picks including Levoit models"},
    {title: "Levoit vs. Blueair", href: "/guides/levoit-vs-blueair", description: "Comparing Levoit's mid-range to Blueair alternatives"},
    {title: "Levoit Core 400S Review", href: "/reviews/levoit-core-400s-review", description: "Levoit's premium smart model for comparison"},
  ],
  "reviews/lg-puricare-dehumidifier-review": [
    {title: "Best Dehumidifiers for Basement", href: "/best-picks/best-dehumidifiers-for-basement", description: "All our top-rated dehumidifiers compared"},
    {title: "Do I Need a Dehumidifier?", href: "/guides/do-i-need-a-dehumidifier", description: "Signs of excess moisture and when to invest"},
    {title: "Humidity and Health", href: "/guides/humidity-and-health", description: "The health impacts of high indoor humidity"},
  ],
  "reviews/pure-enrichment-mistaire-review": [
    {title: "Best Humidifiers", href: "/best-picks/best-humidifiers", description: "Our full humidifier roundup across budgets"},
    {title: "Best Humidifiers for Bedroom", href: "/best-picks/best-humidifiers-for-bedroom", description: "Quiet, compact humidifiers for nighttime use"},
    {title: "Humidity and Health", href: "/guides/humidity-and-health", description: "Why maintaining 40-60% humidity supports health"},
  ],
  "reviews/purpleair-flex-review": [
    {title: "Best Air Quality Monitors", href: "/best-picks/best-air-quality-monitors", description: "Our full monitor roundup including outdoor options"},
    {title: "AQI Explained", href: "/guides/air-quality-index-explained", description: "Understanding PurpleAir's real-time AQI data"},
    {title: "How to Test Home Air Quality", href: "/guides/how-to-test-home-air-quality", description: "Comprehensive guide to indoor air testing methods"},
  ],
  "reviews/samsung-bespoke-cube-review": [
    {title: "Best Smart Air Purifiers", href: "/best-picks/best-smart-air-purifiers", description: "SmartThings-enabled purifiers and competitors"},
    {title: "Best Premium Air Purifiers", href: "/best-picks/best-premium-air-purifiers", description: "High-end purifiers for design-conscious homes"},
    {title: "Dyson Big Quiet Review", href: "/reviews/dyson-big-quiet-review", description: "Another premium option with different filtration approach"},
  ],
  "reviews/shark-air-purifier-6-review": [
    {title: "Best Air Purifiers Under $200", href: "/best-picks/best-air-purifiers-under-200", description: "Value purifiers in the Shark's price range"},
    {title: "Best Air Purifiers for Pet Hair", href: "/best-picks/best-air-purifiers-for-pet-hair", description: "Shark's anti-allergen filtration for pet owners"},
    {title: "HEPA Filters Explained", href: "/guides/hepa-filter-explained", description: "Understanding Shark's anti-allergen HEPA technology"},
  ],
  "reviews/tosot-50-pint-review": [
    {title: "Best Dehumidifiers for Basement", href: "/best-picks/best-dehumidifiers-for-basement", description: "See all our top-rated dehumidifiers"},
    {title: "Frigidaire 50-Pint Review", href: "/reviews/frigidaire-50-pint-review", description: "Our top-rated 50-pint dehumidifier for comparison"},
    {title: "Do I Need a Dehumidifier?", href: "/guides/do-i-need-a-dehumidifier", description: "When a dehumidifier is worth the investment"},
  ],
  "reviews/uhoo-aura-review": [
    {title: "Best Air Quality Monitors", href: "/best-picks/best-air-quality-monitors", description: "All our top-rated monitors compared"},
    {title: "VOCs in Your Home", href: "/guides/vocs-in-your-home", description: "Understanding the VOC readings from your uHoo"},
    {title: "Airthings View Plus Review", href: "/reviews/airthings-view-plus-review", description: "Our top-rated monitor with radon for comparison"},
  ],
  "reviews/vremi-50-pint-review": [
    {title: "Best Dehumidifiers for Basement", href: "/best-picks/best-dehumidifiers-for-basement", description: "Our full basement dehumidifier roundup"},
    {title: "Do I Need a Dehumidifier?", href: "/guides/do-i-need-a-dehumidifier", description: "Assessing your moisture levels and needs"},
    {title: "Frigidaire vs. GE Dehumidifier", href: "/guides/frigidaire-vs-ge-dehumidifier", description: "How the major dehumidifier brands compare"},
  ],
  "reviews/winix-5500-2-review": [
    {title: "Coway vs. Winix", href: "/guides/coway-vs-winix", description: "Head-to-head comparison of the two best value purifiers"},
    {title: "Best Air Purifiers for Allergies", href: "/best-picks/best-air-purifiers-for-allergies", description: "Where the 5500-2 ranks among our top allergy picks"},
    {title: "Air Purifier Maintenance Guide", href: "/guides/air-purifier-maintenance-guide", description: "Maintaining the Winix's washable pre-filter and PlasmaWave"},
    {title: "Coway AP-1512HH Review", href: "/reviews/coway-airmega-ap1512hh-review", description: "The Winix's closest competitor — our #1 overall pick"},
  ],
  "reviews/winix-am90-review": [
    {title: "Best Smart Air Purifiers", href: "/best-picks/best-smart-air-purifiers", description: "Wi-Fi purifiers with app control and auto-sensing"},
    {title: "Coway vs. Winix", href: "/guides/coway-vs-winix", description: "Comparing Winix's smart lineup to Coway alternatives"},
    {title: "Winix 5500-2 Review", href: "/reviews/winix-5500-2-review", description: "Winix's best-value model without smart features"},
    {title: "Air Purifier Energy Costs", href: "/guides/air-purifier-energy-costs", description: "Smart scheduling to reduce your purifier's electricity use"},
  ],
  "guides/air-purifier-vs-humidifier": [
    {title: "Best Humidifiers", href: "/best-picks/best-humidifiers", description: "Our top humidifier picks if you need moisture control"},
    {title: "Best Air Purifiers for Allergies", href: "/best-picks/best-air-purifiers-for-allergies", description: "Top purifiers if allergen removal is your priority"},
    {title: "Humidity and Health", href: "/guides/humidity-and-health", description: "The science of ideal humidity for respiratory health"},
    {title: "Do Air Purifiers Really Work?", href: "/guides/do-air-purifiers-really-work", description: "Evidence-based look at purifier effectiveness"},
  ],
  "guides/how-to-reduce-dust-in-your-home": [
    {title: "Best Air Purifiers for Dust", href: "/best-picks/best-air-purifiers-for-dust", description: "HEPA purifiers specifically rated for dust removal"},
    {title: "HEPA Filters Explained", href: "/guides/hepa-filter-explained", description: "How True HEPA captures 99.97% of dust particles"},
    {title: "Air Purifier Maintenance Guide", href: "/guides/air-purifier-maintenance-guide", description: "Keep your purifier running at peak dust-catching performance"},
    {title: "Best Air Purifiers for Allergies", href: "/best-picks/best-air-purifiers-for-allergies", description: "Dust triggers allergies — these purifiers help most"},
  ],
  "guides/how-to-test-home-air-quality": [
    {title: "Best Air Quality Monitors", href: "/best-picks/best-air-quality-monitors", description: "Our top-rated home monitors for continuous tracking"},
    {title: "Best Portable Air Quality Monitors", href: "/best-picks/best-portable-air-quality-monitors", description: "Handheld monitors for room-by-room spot checks"},
    {title: "AQI Explained", href: "/guides/air-quality-index-explained", description: "How to interpret the numbers your monitor shows"},
    {title: "Radon in Your Home", href: "/guides/radon-in-your-home", description: "Why radon testing requires specialized monitoring"},
  ],
};

let updated = 0;
for (const [relPath, links] of Object.entries(linkMap)) {
  const filePath = path.join(ROOT, relPath + ".mdx");
  if (!fs.existsSync(filePath)) {
    console.log("SKIP (not found): " + relPath);
    continue;
  }
  let content = fs.readFileSync(filePath, "utf-8");
  if (content.includes("InternalLinks")) {
    console.log("SKIP (already has): " + relPath);
    continue;
  }

  const linksStr = links.map(l =>
    `  {title: "${l.title}", href: "${l.href}", description: "${l.description}"}`
  ).join(",\n");

  const component = "\n\n<InternalLinks links={[\n" + linksStr + "\n]} />\n";
  content = content.trimEnd() + component;
  fs.writeFileSync(filePath, content, "utf-8");
  updated++;
  console.log("UPDATED: " + relPath);
}
console.log("\nDone: " + updated + " files updated");
