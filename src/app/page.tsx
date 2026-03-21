"use client";

import { useState } from "react";

interface Chapter {
  id: string;
  title: string;
  desc: string;
  icon: string;
  phase: string;
}

const chapters: Chapter[] = [
  { id: "ch1", title: "History, Definitions", desc: "Introduction to Pharmacognosy", icon: "📜", phase: "A" },
  { id: "ch2", title: "Alternative Systems of Medicine", desc: "Traditional medical systems", icon: "🏥", phase: "A" },
  { id: "ch3", title: "Classification of Drugs", desc: "Categorizing natural drugs", icon: "📊", phase: "A" },
  { id: "ch4", title: "Pharmaceutical Botany", desc: "Study of medicinal plants", icon: "🌱", phase: "B" },
  { id: "ch10", title: "Drug Adulteration", desc: "Detection and prevention", icon: "⚠️", phase: "D" },
  { id: "ch11", title: "Evaluation of Crude Drugs", desc: "Quality assessment methods", icon: "🔍", phase: "D" },
  { id: "ch12", title: "Biological Screening", desc: "Testing herbal drugs", icon: "🧪", phase: "D" },
  { id: "ch14", title: "Drugs Containing Carbohydrates", desc: "Sugar-based medicines", icon: "🍬", phase: "F" },
  { id: "ch15", title: "Drugs Containing Alkaloids", desc: "Nitrogenous compounds", icon: "⚗️", phase: "F" },
  { id: "ch16", title: "Drugs Containing Glycosides", desc: "Sugar-linked compounds", icon: "🍯", phase: "F" },
  { id: "ch17", title: "Drugs Containing Volatile Oils", desc: "Aromatic compounds", icon: "🌸", phase: "F" },
  { id: "ch18", title: "Drugs Containing Resins", desc: "Resinous substances", icon: "🫗", phase: "F" },
  { id: "ch19", title: "Drugs Containing Lipids", desc: "Fatty substances", icon: "🧴", phase: "F" },
  { id: "ch20", title: "Drugs Containing Tannins", desc: "Astringent compounds", icon: "🍂", phase: "F" },
  { id: "ch21", title: "Enzymes and Protein Drugs", desc: "Biological catalysts", icon: "🔬", phase: "F" },
  { id: "ch22", title: "Fibres, Sutures and Dressings", desc: "Textile medical materials", icon: "🩹", phase: "F" },
  { id: "ch23", title: "Drugs of Mineral Origin", desc: "Inorganic medicinal substances", icon: "🪨", phase: "F" },
  { id: "ch24", title: "Extraction Methods", desc: "Isolation and purification", icon: "⚙️", phase: "C" },
  { id: "ch28", title: "Marine Pharmacognosy", desc: "Drugs from the sea", icon: "🌊", phase: "I" },
  { id: "ch30", title: "Natural Pesticides", desc: "Botanical pest control", icon: "🐛", phase: "I" },
  { id: "ch31", title: "Poisonous Plants", desc: "Toxic flora", icon: "☠️", phase: "I" },
  { id: "ch32", title: "Natural Allergens", desc: "Allergenic substances", icon: "🤧", phase: "I" },
  { id: "ch33", title: "Natural Colors and Dyes", desc: "Plant-based pigments", icon: "🎨", phase: "I" },
  { id: "ch34", title: "Hallucinogenic Plants", desc: "Psychoactive flora", icon: "🍄", phase: "I" },
];

const phaseColors: Record<string, string> = {
  A: "from-blue-500 to-cyan-500",
  B: "from-green-500 to-emerald-500",
  C: "from-orange-500 to-amber-500",
  D: "from-purple-500 to-violet-500",
  F: "from-red-500 to-rose-500",
  I: "from-pink-500 to-rose-400",
};

const quizzes: Record<string, { question: string; options: string[]; correct: number }[]> = {
  ch1: [
    { question: "Who is known as the father of modern Pharmacognosy?", options: ["Johann Christian Stark", "Karl P. Wright", "William C. Evans", "Varro E. Tyler"], correct: 0 },
    { question: "Pharmacognosy is the study of:", options: ["Synthetic drugs", "Natural drugs from plants, animals and minerals", "Only pharmaceutical formulations", "Drug manufacturing processes"], correct: 1 },
    { question: "Which ancient civilization first used herbal medicines systematically?", options: ["Greek", "Roman", "Egyptians and Mesopotamians", "Chinese only"], correct: 2 },
    { question: "The term 'Pharmacognosy' was first used by:", options: ["Seydler", "Dioscorides", "Hippocrates", "Galan"], correct: 0 },
    { question: "Who wrote 'De Materia Medica'?", options: ["Hippocrates", "Dioscorides", "Galen", "Avicenna"], correct: 1 },
    { question: "The main sources of natural drugs include:", options: ["Only plants", "Plants, animals and minerals", "Only synthetic compounds", "Only minerals"], correct: 1 },
    { question: "Crude drugs are:", options: ["Pure chemical compounds", "Raw natural materials", "Finished formulations", "Synthetic medicines"], correct: 1 },
    { question: "Pharmacognosy deals with:", options: ["Drug design", "Identification, cultivation and preparation of natural drugs", "Drug marketing", "Clinical trials"], correct: 1 },
    { question: "Which Greek physician is known as father of medicine?", options: ["Aristotle", "Hippocrates", "Socrates", "Plato"], correct: 1 },
    { question: "Egypt contributed significantly to pharmacognosy through:", options: ["Development of synthetics", "Papyrus Ebers", "DNA technology", "Modern chromatography"], correct: 1 },
    { question: "Ethnobotany is the study of:", options: ["Drug synthesis", "Relationship between plants and humans", "Plant genetics", "Plant pathology"], correct: 1 },
    { question: "Ethnopharmacology studies:", options: ["Animal drugs only", "Traditional medicine systems", "Synthetic drugs", "Drug pricing"], correct: 1 },
    { question: "Which is NOT a traditional system of medicine?", options: ["Ayurveda", "Unani", "Allopathy", "Homeopathy"], correct: 2 },
    { question: "Ayurveda originated in:", options: ["Greece", "India", "China", "Persia"], correct: 1 },
    { question: "The Unani system originated in:", options: ["India", "Greece", "China", "Egypt"], correct: 1 },
    { question: "Pharmacognosy differs from pharmacology in that it studies:", options: ["Drug toxicity only", "Natural drug sources and characteristics", "Drug metabolism", "Drug synthesis"], correct: 1 },
    { question: "Primary metabolites in plants include:", options: ["Alkaloids", "Carbohydrates, proteins and lipids", "Terpenes", "Phenolics"], correct: 1 },
    { question: "Secondary metabolites in plants include:", options: ["Glucose", "Alkaloids and terpenes", "Amino acids", "Fatty acids"], correct: 1 },
    { question: "Phytotherapy is:", options: ["Surgery using plants", "Treatment using plant medicines", "Plant classification", "Plant breeding"], correct: 1 },
    { question: "Natural product chemistry deals with:", options: ["Petroleum compounds", "Compounds from natural sources", "Synthetic compounds", "Metallic compounds"], correct: 1 },
  ],
  ch2: [
    { question: "Ayurveda emphasizes balance of:", options: ["Four humors", "Three doshas", "Five elements only", "Two energies"], correct: 1 },
    { question: "The three doshas in Ayurveda are:", options: ["Vata, Pitta, Kapha", "Kapha, Vata, Pitta", "Pitta, Kapha, Vata", "All of the above"], correct: 0 },
    { question: "The goal of Ayurveda is:", options: ["Disease treatment only", "Complete wellness and balance", "Only prevention", "Surgical procedures"], correct: 1 },
    { question: "Unani medicine is based on:", options: ["Three humors", "Four humors", "Five elements", "Chakras"], correct: 1 },
    { question: "Unani system was developed by:", options: ["Charaka", "Hippocrates and Galen", "Sushruta", "Shennong"], correct: 1 },
    { question: "Traditional Chinese Medicine (TCM) includes:", options: ["Only acupuncture", "Acupuncture, herbs and tai chi", "Only herbal medicine", "Surgery"], correct: 1 },
    { question: "Acupuncture works on the principle of:", options: ["Blood circulation", "Meridians and energy flow", "Nerve stimulation only", "Hormone balance"], correct: 1 },
    { question: "Yin and Yang represent:", options: ["Good and evil", "Complementary opposing forces", "Only positive energy", "Negative energy only"], correct: 1 },
    { question: "Homeopathy is based on:", options: ["Opposite cures opposite", "Like cures like", "Similar cures similar", "None of the above"], correct: 1 },
    { question: "Homeopathy was founded by:", options: ["Hahnemann", "Hippocrates", "Galen", "Avicenna"], correct: 0 },
    { question: "Naturopathy emphasizes:", options: ["Chemical drugs", "Natural healing and self-healing", "Surgery only", "Radiation therapy"], correct: 1 },
    { question: "Which is NOT a disadvantage of herbal medicine?", options: ["Standardization issues", "Potential drug interactions", "Proven efficacy", "Variable quality"], correct: 2 },
    { question: "Integrative medicine combines:", options: ["Only conventional medicine", "Only traditional medicine", "Conventional and traditional approaches", "Surgery and radiation"], correct: 2 },
    { question: "Panchakarma in Ayurveda is:", options: ["A type of meditation", "Detoxification treatment", "Yoga posture", "Herbal preparation"], correct: 1 },
    { question: "WHO promotes traditional medicine because:", options: ["It replaces modern medicine", "It contributes to healthcare access", "It is always safe", "It is cheap only"], correct: 1 },
  ],
  ch3: [
    { question: "Drugs can be classified morphologically based on:", options: ["Chemical structure", "Plant part used", "Pharmacological action", "Therapeutic use"], correct: 1 },
    { question: "Chemical classification of drugs is based on:", options: ["Plant family", "Chemical constituents", "Geographical origin", "Color"], correct: 1 },
    { question: "Taxonomical classification is based on:", options: ["Therapeutic use", "Botanical taxonomy", "Chemical structure", "Geographical source"], correct: 1 },
    { question: "Alkaloids are classified chemically as:", options: ["Carbohydrates", "Nitrogen-containing compounds", "Lipids", "Vitamins"], correct: 1 },
    { question: "Glycosides contain:", options: ["Only sugar moiety", "Sugar + non-sugar moiety", "Only nitrogen", "Only lipids"], correct: 1 },
    { question: "Volatile oils are also known as:", options: ["Fixed oils", "Essential oils", "Mineral oils", "Synthetic oils"], correct: 1 },
    { question: "Tannins are chemically:", options: ["Proteins", "Polyphenolic compounds", "Carbohydrates", "Lipids"], correct: 1 },
    { question: "Which is a disadvantage of chemical classification?", options: ["Easy identification", "Some drugs have multiple constituents", "Clear grouping", "Simple to use"], correct: 1 },
    { question: "Lamiaceae family is also known as:", options: ["Mint family", "Rose family", "Aster family", "Legume family"], correct: 0 },
    { question: "Asteraceae family includes:", options: ["Mints", "Daisies and sunflowers", "Legumes", "Nightshades"], correct: 1 },
    { question: "Fabaceae family includes:", options: ["Legumes", "Rose family", "Mint family", "Aster family"], correct: 0 },
    { question: "Solanaceae family includes:", options: ["Potato and tomato", "Mint family", "Legumes", "Gourd family"], correct: 0 },
    { question: "Cardiac glycosides are used for:", options: ["Pain relief", "Heart conditions", "Infection treatment", "Inflammation"], correct: 1 },
    { question: "Tropane alkaloids include:", options: ["Morphine", "Atropine and cocaine", "Quinine", "Caffeine"], correct: 1 },
    { question: "Indole alkaloids include:", options: ["Atropine", "Reserpine and ergot", "Cocaine", "Ephedrine"], correct: 1 },
  ],
  ch4: [
    { question: "Pharmaceutical botany deals with:", options: ["Plant diseases", "Study of plants used in medicines", "Plant breeding", "Plant ecology"], correct: 1 },
    { question: "The basic structural unit of plants is:", options: ["Tissue", "Organ", "Cell", "System"], correct: 2 },
    { question: "Meristematic tissues are responsible for:", options: ["Storage", "Growth and division", "Protection", "Transport"], correct: 1 },
    { question: "Xylem is responsible for:", options: ["Food transport", "Water and mineral transport", "Gas exchange", "Secretion"], correct: 1 },
    { question: "Phloem is responsible for:", options: ["Water transport", "Food transport", "Support only", "Photosynthesis"], correct: 1 },
    { question: "Stomata are involved in:", options: ["Reproduction", "Gas exchange", "Support", "Storage"], correct: 1 },
    { question: "The binomial nomenclature was introduced by:", options: ["Theophrastus", "Linnaeus", "Darwin", "Mendel"], correct: 1 },
    { question: "Trichomes are:", options: ["Underground stems", "Hair-like structures", "Flowers", "Roots"], correct: 1 },
    { question: "Epidermis provides:", options: ["Internal transport", "External protection", "Photosynthesis", "Reproduction"], correct: 1 },
    { question: "Which plant family includes medicinal herbs like mint?", options: ["Rosaceae", "Lamiaceae", "Fabaceae", "Solanaceae"], correct: 1 },
    { question: "Secondary metabolites in plants function primarily as:", options: ["Energy source", "Growth regulators", "Defense compounds", "Structural components"], correct: 2 },
    { question: "Photosynthesis occurs in:", options: ["Roots only", "Leaves", "Stems only", "Flowers"], correct: 1 },
    { question: "Tissue culture is a method of:", options: ["Sexual reproduction", "Asexual propagation", "Hybridization", "Genetic engineering"], correct: 1 },
    { question: "Cortex is found in:", options: ["Only leaves", "Stem and root", "Flowers only", "Seeds only"], correct: 1 },
    { question: "The scientific name of a plant consists of:", options: ["One word", "Two words", "Three words", "Four words"], correct: 1 },
  ],
  ch10: [
    { question: "Drug adulteration is:", options: ["Proper drug preparation", "Intentional contamination or substitution", "Drug standardization", "Quality control"], correct: 1 },
    { question: "Intentional adulteration is done for:", options: ["Medical reasons", "Economic gain", "Safety", "None"], correct: 1 },
    { question: "Which is a type of adulteration?", options: ["Purification", "Substitution", "Standardization", "Analysis"], correct: 1 },
    { question: "Adulteration with synthetic drugs is done to:", options: ["Improve safety", "Enhance effect and reduce cost", "Improve taste", "Enhance color"], correct: 1 },
    { question: "TLC is used for:", options: ["Drug synthesis", "Drug adulteration detection", "Drug packaging", "Drug prescription"], correct: 1 },
    { question: "HPLC stands for:", options: ["High Performance Liquid Chromatography", "High Pressure Liquid Chromatography", "High Purity Liquid Chromatography", "High Power Liquid Chromatography"], correct: 0 },
    { question: "Microscopic examination can detect:", options: ["Chemical composition", "Morphological characteristics", "Genetic makeup", "Molecular weight"], correct: 1 },
    { question: "GC is used for:", options: ["Non-volatile compounds", "Volatile compounds", "Only solids", "Only liquids"], correct: 1 },
    { question: "UV spectroscopy is used to detect:", options: ["Weight", "Absorption of UV light", "Magnetic properties", "Electrical conductivity"], correct: 1 },
    { question: "Mass spectrometry identifies:", options: ["Color", "Molecular weight and structure", "Taste", "Odor"], correct: 1 },
    { question: "IP stands for:", options: ["Indian Pharmacopoeia", "International Pharmacy", "International Pharmacopoeia", "Indian Pharmacy"], correct: 0 },
    { question: "BP stands for:", options: ["British Pharmacy", "British Pharmacopoeia", "Biological Products", "Bioactive Compounds"], correct: 1 },
    { question: "GMP stands for:", options: ["Good Manufacturing Practice", "General Medical Practice", "Global Medical Product", "Good Medical Practice"], correct: 0 },
    { question: "Adulteration can cause:", options: ["Better efficacy", "Harmful effects", "No effect", "Improved safety"], correct: 1 },
    { question: "Spoilage is a type of:", options: ["Intentional adulteration", "Unintentional adulteration", "Standardization", "Purification"], correct: 1 },
  ],
  ch11: [
    { question: "Evaluation of crude drugs includes:", options: ["Only chemical tests", "Macroscopic, microscopic, chemical and biological evaluation", "Only visual inspection", "Only pricing"], correct: 1 },
    { question: "Macroscopic evaluation involves:", options: ["Microscope examination", "Visual examination with naked eye", "Chemical analysis", "Genetic testing"], correct: 1 },
    { question: "Ash value indicates:", options: ["Sugar content", "Inorganic matter content", "Water content", "Fat content"], correct: 1 },
    { question: "Total ash includes:", options: ["Only acid soluble ash", "Physiological and non-physiological ash", "Water soluble ash", "Organic matter"], correct: 1 },
    { question: "Acid-insoluble ash mainly contains:", options: ["Sugar", "Silica", "Protein", "Lipid"], correct: 1 },
    { question: "Extractive values indicate:", options: ["Color", "Soluble matter content", "Weight", "Density"], correct: 1 },
    { question: "Moisture content is measured by:", options: ["Loss on drying only", "Loss on drying and Karl Fischer method", "Ash method", "Extraction method"], correct: 1 },
    { question: "TLC is used to:", options: ["Weigh drugs", "Separate and identify compounds", "Measure color", "Test taste"], correct: 1 },
    { question: "Rf value in TLC represents:", options: ["Rate of flow", "Ratio of fronts", "Refractive factor", "Retention factor"], correct: 1 },
    { question: "HPLC is used for:", options: ["Gas analysis only", "Separation and quantification of compounds", "Only qualitative analysis", "Physical property measurement"], correct: 1 },
    { question: "Organoleptic evaluation includes:", options: ["Taste, smell, color and texture", "Chemical composition", "Genetic makeup", "Molecular weight"], correct: 0 },
    { question: "Swelling index measures:", options: ["Water absorption capacity", "Fat content", "Sugar content", "Ash content"], correct: 0 },
    { question: "Foaming index measures:", options: ["Foam-forming capacity", "Surface tension", "Viscosity", "Density"], correct: 0 },
    { question: "Chromatography separates compounds based on:", options: ["Color", "Molecular size and affinity", "Weight", "Shape only"], correct: 1 },
    { question: "Specific gravity is measured using:", options: ["Microscope", "Pycnometer or hydrometer", "Balance", "Spectroscope"], correct: 1 },
  ],
  ch12: [
    { question: "Biological screening is done to:", options: ["Identify chemical structure", "Determine biological activity", "Measure weight", "Test color"], correct: 1 },
    { question: "In vitro screening is done:", options: ["In living organisms", "Outside living organisms", "Only in humans", "In soil"], correct: 1 },
    { question: "In vivo screening is done:", options: ["In test tubes", "In living organisms", "In computers", "In microscopes"], correct: 1 },
    { question: "Antioxidant assays include:", options: ["DPPH assay", "Only acidity test", "Only color test", "Only weight test"], correct: 0 },
    { question: "Antimicrobial screening tests:", options: ["Anticancer activity", "Antibacterial and antifungal activity", "Antiviral activity only", "Anti-inflammatory only"], correct: 1 },
    { question: "Cytotoxicity testing measures:", options: ["Cell growth", "Cell death or viability", "Cell color", "Cell weight"], correct: 1 },
    { question: "MTT assay is used for:", options: ["Cell viability", "Cell weight", "Cell age", "Cell division"], correct: 0 },
    { question: "DPPH assay measures:", options: ["Antioxidant activity", "Acidity", "Sugar content", "Water content"], correct: 0 },
    { question: "MIC stands for:", options: ["Minimum Inhibitory Concentration", "Maximum Inhibitory Concentration", "Mean Inhibitory Concentration", "Multiple Inhibitory Concentration"], correct: 0 },
    { question: "Disc diffusion method tests:", options: ["Antibiotic susceptibility", "Drug color", "Drug weight", "Drug taste"], correct: 0 },
    { question: "Lead compound is:", options: ["A toxic compound", "A promising compound for further development", "A rejected compound", "A known compound"], correct: 1 },
    { question: "SAR stands for:", options: ["Structure-Activity Relationship", "Standard Analytical Result", "Systematic Analysis Report", "Scientific Activity Review"], correct: 0 },
    { question: "Molecular docking is:", options: ["A physical technique", "A computational technique", "A chemical technique", "A biological technique"], correct: 1 },
    { question: "The 3R principle includes:", options: ["Reduce, Reuse, Recycle", "Replacement, Reduction, Refinement", "Research, Review, Report", "Record, Reproduce, Report"], correct: 1 },
    { question: "Acute toxicity testing studies:", options: ["Long-term effects", "Short-term毒性 effects", "Genetic effects", "Environmental effects"], correct: 1 },
  ],
  ch14: [
    { question: "Carbohydrates are:", options: ["Proteins", "Polyhydroxy aldehydes or ketones", "Lipids", "Vitamins"], correct: 1 },
    { question: "Starch is a:", options: ["Monosaccharide", "Disaccharide", "Polysaccharide", "Oligosaccharide"], correct: 2 },
    { question: " cellulose is a:", options: ["Storage polysaccharide", "Structural polysaccharide", "Simple sugar", "Protein"], correct: 1 },
    { question: "Agar is obtained from:", options: ["Plants", "Seaweeds", "Fungi", "Animals"], correct: 1 },
    { question: "Gum arabic is obtained from:", options: ["Acacia tree", "Seaweed", "Fungi", "Animal bones"], correct: 0 },
    { question: "Pectin is used as:", options: ["Thickening agent", "Sweetener", "Preservative", "Coloring agent"], correct: 0 },
    { question: "Inulin is a carbohydrate used for:", options: ["Sweetening", "Dietary fiber and prebiotic", "Thickening", "Preservation"], correct: 1 },
    { question: "Molisch test is for detection of:", options: ["Proteins", "Carbohydrates", "Lipids", "Vitamins"], correct: 1 },
    { question: "Fehling test detects:", options: ["Proteins", "Reducing sugars", "Lipids", "Minerals"], correct: 1 },
    { question: "Iodine test gives blue color with:", options: ["Glucose", "Sucrose", "Starch", "Fructose"], correct: 2 },
    { question: "Sodium alginate is derived from:", options: ["Plants", "Seaweeds", "Fungi", "Bacteria"], correct: 1 },
    { question: "Carrageenan is used in:", options: ["Only medicine", "Food industry as thickener", "Only cosmetics", "Only textiles"], correct: 1 },
    { question: "Dextrin is produced by:", options: ["Protein hydrolysis", "Starch hydrolysis", "Fat hydrolysis", "Mineral processing"], correct: 1 },
    { question: "Guar gum is obtained from:", options: ["Seaweed", "Guar plant seeds", "Fungi", "Animal sources"], correct: 1 },
    { question: "Mutarotation is property of:", options: ["Proteins", "Carbohydrates", "Lipids", "Vitamins"], correct: 1 },
  ],
  ch15: [
    { question: "Alkaloids contain:", options: ["Oxygen only", "Nitrogen in heterocyclic ring", "Sulfur only", "Phosphorus only"], correct: 1 },
    { question: "Morphine is obtained from:", options: ["Cinchona bark", "Opium poppy", "Ephedra plant", "Coca plant"], correct: 1 },
    { question: "Quinine is used for:", options: ["Pain relief", "Malaria treatment", "Heart conditions", "Diabetes"], correct: 1 },
    { question: "Caffeine is found in:", options: ["Only coffee", "Coffee, tea and cocoa", "Only tea", "Only cocoa"], correct: 1 },
    { question: "Atropine is obtained from:", options: ["Belladonna", "Opium poppy", "Cinchona", "Ephedra"], correct: 0 },
    { question: "Mayer's reagent gives precipitate with:", options: ["Glycosides", "Alkaloids", "Tannins", "Carbohydrates"], correct: 1 },
    { question: "Indole alkaloids include:", options: ["Atropine", "Reserpine", "Cocaine", "Ephedrine"], correct: 1 },
    { question: "Tropane alkaloids include:", options: ["Morphine", "Atropine and cocaine", "Quinine", "Caffeine"], correct: 1 },
    { question: "Ephedrine is obtained from:", options: ["Ephedra plant", "Poppy plant", "Cinchona tree", "Belladonna"], correct: 0 },
    { question: "Nicotine is found in:", options: ["Coffee", "Tobacco", "Tea", "Cocoa"], correct: 1 },
    { question: "Cocaine is obtained from:", options: ["Opium poppy", "Coca plant", "Ephedra", "Belladonna"], correct: 1 },
    { question: "Wagner's reagent is used for detection of:", options: ["Glycosides", "Alkaloids", "Tannins", "Carbohydrates"], correct: 1 },
    { question: "Alkaloids are usually:", options: ["Acidic", "Basic", "Neutral", "Amphoteric"], correct: 1 },
    { question: "Quinidine is used for:", options: ["Malaria", "Heart arrhythmias", "Pain", "Infection"], correct: 1 },
    { question: "Strychnine is obtained from:", options: ["Nux-vomica", "Opium", "Belladonna", "Ephedra"], correct: 0 },
  ],
  ch16: [
    { question: "Glycosides consist of:", options: ["Only sugar", "Sugar + aglycone", "Only protein", "Only lipid"], correct: 1 },
    { question: "The non-sugar part of glycoside is called:", options: ["Glycone", "Aglycone", "Sugar alcohol", "Acid"], correct: 1 },
    { question: "Cardiac glycosides are used for:", options: ["Infection", "Heart conditions", "Pain relief", "Diabetes"], correct: 1 },
    { question: "Digoxin is obtained from:", options: ["Digitalis plant", "Cinchona bark", "Opium poppy", "Ephedra"], correct: 0 },
    { question: "Sennosides are obtained from:", options: ["Senna plant", "Ginseng", "Turmeric", "Ginger"], correct: 0 },
    { question: "Glycyrrhizin is obtained from:", options: ["Ginseng", "Licorice root", "Turmeric", "Ginger root"], correct: 1 },
    { question: "Amygdalin is a:", options: ["Alkaloid", "Glycoside", "Tannin", "Volatile oil"], correct: 1 },
    { question: "Salicin is obtained from:", options: ["Willow bark", "Ginseng", "Turmeric", "Ginger"], correct: 0 },
    { question: "Anthraquinone glycosides are found in:", options: ["Senna and aloe", "Ginseng", "Turmeric", "Ginger"], correct: 0 },
    { question: "Saponin glycosides produce:", options: ["No foam", "Foam when shaken", "Precipitate", "Color change"], correct: 1 },
    { question: "Cyanogenic glycosides release:", options: ["Oxygen", "Hydrogen cyanide", "Carbon dioxide", "Nitrogen"], correct: 1 },
    { question: "Flavonoid glycosides are found in:", options: ["Only roots", "Many plants including fruits and leaves", "Only stems", "Only flowers"], correct: 1 },
    { question: "Hydrolysis of glycosides yields:", options: ["Only sugar", "Sugar + aglycone", "Only protein", "Only lipid"], correct: 1 },
    { question: "Rhein is an anthraquinone derivative found in:", options: ["Turmeric", "Aloe", "Ginger", "Ginseng"], correct: 1 },
    { question: "Flavonoids are chemically:", options: ["Terpenes", "Phenolic compounds", "Alkaloids", "Lipids"], correct: 1 },
  ],
  ch17: [
    { question: "Volatile oils are also called:", options: ["Fixed oils", "Essential oils", "Mineral oils", "Fatty oils"], correct: 1 },
    { question: "Volatile oils are obtained by:", options: ["Solvent extraction only", "Steam distillation", "Pressing only", "Fermentation"], correct: 1 },
    { question: "Menthol is obtained from:", options: ["Peppermint", "Eucalyptus", "Tea tree", "Lavender"], correct: 0 },
    { question: "Camphor is obtained from:", options: ["Cinnamomum camphora", "Eucalyptus", "Mentha", "Lavandula"], correct: 0 },
    { question: "Eucalyptol is found in:", options: ["Peppermint", "Eucalyptus", "Clove", "Cinnamon"], correct: 1 },
    { question: "Thymol is found in:", options: ["Thyme", "Peppermint", "Eucalyptus", "Clove"], correct: 0 },
    { question: "Eugenol is found in:", options: ["Peppermint", "Eucalyptus", "Clove", "Thyme"], correct: 2 },
    { question: "Citral is found in:", options: ["Lemongrass", "Peppermint", "Eucalyptus", "Thyme"], correct: 0 },
    { question: "Steam distillation is used for:", options: ["Non-volatile compounds", "Volatile compounds", "Solids only", "Liquids only"], correct: 1 },
    { question: "Supercritical fluid extraction uses:", options: ["Only water", "Carbon dioxide under pressure", "Only alcohol", "Only ether"], correct: 1 },
    { question: "Volatile oils are soluble in:", options: ["Water", "Organic solvents", "Acids", "Bases"], correct: 1 },
    { question: "The aroma of volatile oils is due to:", options: ["Heavy metals", "Aromatic compounds", "Sugars", "Proteins"], correct: 1 },
    { question: "Olfactory properties of volatile oils are used in:", options: ["Only medicine", "Aromatherapy", "Only food", "Only cosmetics"], correct: 1 },
    { question: "Geraniol is found in:", options: ["Rose oil", "Peppermint", "Eucalyptus", "Thyme"], correct: 0 },
    { question: "Volatile oils should be stored in:", options: ["Clear glass", "Amber/dark glass containers", "Plastic containers", "Metal containers"], correct: 1 },
  ],
  ch18: [
    { question: "Resins are:", options: ["Water-soluble compounds", "Insoluble plant exudates", "Sugars", "Proteins"], correct: 1 },
    { question: "Turpentine is obtained from:", options: ["Pine trees", "Myrrh tree", "Frankincense tree", "Gum arabic tree"], correct: 0 },
    { question: "Myrrh is obtained from:", options: ["Pine tree", "Commiphora species", "Pistacia tree", "Boswellia tree"], correct: 1 },
    { question: "Benzoin is obtained from:", options: ["Pine", "Styrax species", "Commiphora", "Boswellia"], correct: 1 },
    { question: "Shellac is obtained from:", options: ["Plants", "Insect secretions", "Fungi", "Algae"], correct: 1 },
    { question: "Dammar is obtained from:", options: ["Pine trees", "Shorea species", "Commiphora", "Ficus"], correct: 1 },
    { question: "Gum-resins are mixtures of:", options: ["Only gums", "Gums and resins", "Only resins", "Resins and oils"], correct: 1 },
    { question: "Rosin is obtained from:", options: ["Myrrh", "Pine resin", "Shellac", "Dammar"], correct: 1 },
    { question: "Oleoresins contain:", options: ["Only oil", "Resin + volatile oil", "Only resin", "Gum + resin"], correct: 1 },
    { question: "Balsams are:", options: ["Oleoresins with benzoic/cinnamic acid", "Pure resins", "Gums only", "Oils only"], correct: 0 },
    { question: "Acid value of resins indicates:", options: ["Acidity content", "Free acid content", "Basic content", "Sugar content"], correct: 1 },
    { question: "Frankincense is obtained from:", options: ["Commiphora", "Boswellia species", "Pistacia", "Shorea"], correct: 1 },
    { question: "Resins are used in:", options: ["Only medicine", "Varnishes, adhesives and medicine", "Only food", "Only textiles"], correct: 1 },
    { question: "Methyl salicylate is found in:", options: ["Turpentine", "Wintergreen", "Camphor", "Eucalyptus"], correct: 1 },
    { question: "Resins are generally:", options: ["Water soluble", "Alcohol soluble", "Acid soluble", "Alkali soluble"], correct: 1 },
  ],
  ch19: [
    { question: "Lipids are:", options: ["Water-soluble compounds", "Water-insoluble organic compounds", "Proteins", "Carbohydrates"], correct: 1 },
    { question: "Fixed oils are:", options: ["Volatile", "Non-volatile fats and oils", "Mineral oils", "Synthetic oils"], correct: 1 },
    { question: "Castor oil is obtained from:", options: ["Olive plant", "Castor bean", "Coconut palm", "Flax plant"], correct: 1 },
    { question: "Theobroma oil is found in:", options: ["Cocoa bean", "Olive", "Coconut", "Castor bean"], correct: 0 },
    { question: "Saponification value indicates:", options: ["Acid content", "Ester content/fatty acid content", "Sugar content", "Water content"], correct: 1 },
    { question: "Iodine value indicates:", options: ["Saturation of fats", "Acid content", "Moisture content", "Ash content"], correct: 0 },
    { question: "Peroxide value measures:", options: ["Freshness/rancidity", "Water content", "Sugar content", "Mineral content"], correct: 0 },
    { question: "Lanolin is obtained from:", options: ["Plants", "Sheep wool", "Beeswax", "Spermaceti"], correct: 1 },
    { question: "Beeswax is produced by:", options: ["Plants", "Honeybees", "Silkworms", "Insects"], correct: 1 },
    { question: "Spermaceti is obtained from:", options: ["Plants", "Whale", "Bees", "Sheep"], correct: 1 },
    { question: "Coconut oil is rich in:", options: ["Polyunsaturated fats", "Saturated fats", "Trans fats", "Unsaturated fats only"], correct: 1 },
    { question: "Linseed oil is obtained from:", options: ["Coconut", "Flax plant", "Olive", "Castor bean"], correct: 1 },
    { question: "Wool fat contains:", options: ["Cholesterol and lanolin", "Only cholesterol", "Only lanolin", "No cholesterol"], correct: 0 },
    { question: "Lipids are used as:", options: ["Only fuel", "Emollients, bases and solvents", "Only preservatives", "Only sweeteners"], correct: 1 },
    { question: "Acid value measures:", options: ["Free fatty acids", "Ester content", "Water content", "Ash content"], correct: 0 },
  ],
  ch20: [
    { question: "Tannins are:", options: ["Proteins", "Polyphenolic compounds", "Carbohydrates", "Lipids"], correct: 1 },
    { question: "Hydrolyzable tannins on hydrolysis yield:", options: ["Only phenols", "Phenolic acids and sugars", "Only sugars", "Proteins"], correct: 1 },
    { question: "Condensed tannins are also called:", options: ["Hydrolyzable tannins", "Proanthocyanidins", "Ellagitannins", "Gallotannins"], correct: 1 },
    { question: "Tannic acid is obtained from:", options: ["Oak bark", "Gall nuts", "Tea leaves", "All of the above"], correct: 1 },
    { question: "Tannins give positive test with:", options: ["Iodine", "Ferric chloride", "Benedict's reagent", "Molisch reagent"], correct: 1 },
    { question: "Astringent property of tannins is due to:", options: ["Sweet taste", "Protein precipitation", "Bitter taste", "Sour taste"], correct: 1 },
    { question: "Catechu is obtained from:", options: ["Acacia catechu", "Oak tree", "Tea plant", "Cinchona"], correct: 0 },
    { question: "Myrobalan is a source of:", options: ["Tannins", "Alkaloids", "Volatile oils", "Glycosides"], correct: 0 },
    { question: "Tannins are used in:", options: ["Only medicine", "Leather industry and medicine", "Only food", "Only cosmetics"], correct: 1 },
    { question: "Gelatin test for tannins involves:", options: ["Precipitation", "Color change", "Gas evolution", "Odor change"], correct: 0 },
    { question: "Gallic acid is found in:", options: ["Only oak bark", "Galls, tea and oak bark", "Only tea", "Only galls"], correct: 1 },
    { question: "Tannins can cause liver damage when:", options: ["Used in small amounts", "Consumed in large amounts", "Never toxic", "Applied externally"], correct: 1 },
    { question: "Oak bark is rich in:", options: ["Volatile oils", "Hydrolyzable tannins", "Alkaloids", "Glycosides"], correct: 1 },
    { question: "Tannins are soluble in:", options: ["Oil", "Water and alcohol", "Ether only", "Chloroform only"], correct: 1 },
    { question: "Pyrogallol is derived from:", options: ["Gallic acid", "Tannic acid", "Both gallic and tannic acid", "Catechin"], correct: 1 },
  ],
  ch21: [
    { question: "Enzymes are:", options: ["Carbohydrates", "Proteins with catalytic activity", "Lipids", "Nucleic acids"], correct: 1 },
    { question: "Enzymes are obtained from:", options: ["Only plants", "Plants, animals and microorganisms", "Only animals", "Only synthetic sources"], correct: 1 },
    { question: "Bromelain is obtained from:", options: ["Papaya", "Pineapple", "Papain source", "Pineapple and papaya"], correct: 1 },
    { question: "Papain is obtained from:", options: ["Pineapple", "Papaya latex", "Beef pancreas", "Bacteria"], correct: 1 },
    { question: "Pancreatin is obtained from:", options: ["Plants", "Animal pancreas", "Fungi", "Bacteria"], correct: 1 },
    { question: "Pepsin is a:", options: ["Protease", "Lipase", "Amylase", "Lactase"], correct: 0 },
    { question: "Trypsin is used for:", options: ["Digestion of proteins", "Digestion of fats", "Digestion of carbohydrates", "As preservative"], correct: 0 },
    { question: "Streptokinase is used as:", options: ["Antibiotic", "Anticoagulant/Clot-dissolving agent", "Anti-inflammatory", "Antipyretic"], correct: 1 },
    { question: "L-asparaginase is used in:", options: ["Infection treatment", "Cancer treatment", "Diabetes treatment", "Pain relief"], correct: 1 },
    { question: "Enzyme units are measured in:", options: ["Grams", "International Units (IU)", "Milliliters", "Moles"], correct: 1 },
    { question: "Enzyme activity is affected by:", options: ["Only temperature", "Temperature, pH and substrate", "Only pH", "Only substrate concentration"], correct: 1 },
    { question: "Immobilized enzymes are:", options: ["Free in solution", "Attached to solid support", "Denatured", "Inactivated"], correct: 1 },
    { question: "Enzyme specificity is:", options: ["Low", "High", "None", "Variable"], correct: 1 },
    { question: "Oxidoreductases catalyze:", options: ["Hydrolysis", "Oxidation-reduction reactions", "Isomerization", "Lyases"], correct: 1 },
    { question: "Lyases catalyze:", options: ["Oxidation", "Addition/elimination of groups", "Transfer of groups", "Isomerization"], correct: 1 },
  ],
  ch22: [
    { question: "Cotton is obtained from:", options: ["Cotton plant seed hairs", "Flax plant", "Hemp plant", "Jute plant"], correct: 0 },
    { question: "Absorbable sutures include:", options: ["Nylon", "Silk", "Catgut", "Polyester"], correct: 2 },
    { question: "Non-absorbable sutures include:", options: ["Catgut", "Silk", "Nylon", "Both silk and nylon"], correct: 3 },
    { question: "Catgut is obtained from:", options: ["Cotton", "Silkworm", "Sheep intestine", "Hemp"], correct: 2 },
    { question: "Gauze is made from:", options: ["Cotton", "Silk", "Synthetic fibers", "Any of the above"], correct: 0 },
    { question: "Plaster of Paris is:", options: ["Calcium sulfate hemihydrate", "Calcium carbonate", "Calcium oxide", "Calcium chloride"], correct: 0 },
    { question: "Jute is obtained from:", options: ["Cotton plant", "Corchorus plant", "Cannabis plant", "Flax plant"], correct: 1 },
    { question: "Hemp is a source of:", options: ["Only fibers", "Fibers and cannabinoids", "Only seeds", "Only oil"], correct: 1 },
    { question: "Surgical dressings are used for:", options: ["Only decoration", "Wound healing and protection", "Only support", "Only absorbency"], correct: 1 },
    { question: "Bandages provide:", options: ["Only coverage", "Support, compression and protection", "Only compression", "Only aesthetics"], correct: 1 },
    { question: "Cotton wool is mainly:", options: ["Processed cotton", "Synthetic fiber", "Natural silk", "Mineral wool"], correct: 0 },
    { question: "Linen is obtained from:", options: ["Cotton plant", "Flax plant", "Hemp plant", "Jute plant"], correct: 1 },
    { question: "Nylon sutures are:", options: ["Absorbable", "Non-absorbable", "Slowly absorbable", "Partially absorbable"], correct: 1 },
    { question: "Steel wire sutures are:", options: ["Absorbable", "Non-absorbable", "Slowly absorbable", "Coated absorbable"], correct: 1 },
    { question: "Rayon is a:", options: ["Natural fiber", "Semi-synthetic fiber", "Synthetic fiber", "Mineral fiber"], correct: 1 },
  ],
  ch23: [
    { question: "Drugs of mineral origin include:", options: ["Only plant extracts", "Inorganic substances", "Only animal products", "Only synthetic drugs"], correct: 1 },
    { question: "Calcium carbonate is used as:", options: ["Antacid", "Laxative", "Diuretic", "Sedative"], correct: 0 },
    { question: "Kaolin is used as:", options: ["Antacid", "Adsorbent/antidiarrheal", "Laxative", "Sedative"], correct: 1 },
    { question: "Talc is used in:", options: ["Medicine only", "Cosmetics and medicine", "Food only", "Industry only"], correct: 1 },
    { question: "Zinc oxide is used as:", options: ["Antacid", "Protectant in skin preparations", "Laxative", "Diuretic"], correct: 1 },
    { question: "Magnesium carbonate is used as:", options: ["Antacid", "Laxative", "Antibiotic", "Anti-inflammatory"], correct: 0 },
    { question: "Bentonite is:", options: ["Clay mineral", "Organic compound", "Metal oxide", "Salt"], correct: 0 },
    { question: "Iron oxide is used for:", options: ["Only coloring", "Coloring and as iron supplement", "As preservative", "As sweetener"], correct: 1 },
    { question: "Sodium chloride is used in:", options: ["Only food", "IV fluids and as isotonic solution", "Only cosmetics", "Only industrial"], correct: 1 },
    { question: "Yellow mercuric oxide is used for:", options: ["Internal medicine", "Ophthalmic preparations", "Antiseptic only", "Sedative"], correct: 1 },
    { question: "Mineral drugs are generally:", options: ["Organic compounds", "Inorganic compounds", "Complex mixtures", "Proteins"], correct: 1 },
    { question: "Precipitated chalk is:", options: ["Calcium oxide", "Calcium carbonate", "Calcium hydroxide", "Calcium sulfate"], correct: 1 },
    { question: "Light magnesium carbonate is used as:", options: ["Antacid", "Laxative", "Antibiotic", "All of the above"], correct: 0 },
    { question: "Drugs of mineral origin are identified by:", options: ["Only color", "Chemical tests and physical properties", "Only taste", "Only smell"], correct: 1 },
    { question: "Sulfur is used in:", options: ["Only industry", "Medicine and industry", "Only cosmetics", "Only food"], correct: 1 },
  ],
  ch24: [
    { question: "Extraction is:", options: ["Purification process", "Process of obtaining compounds from natural sources", "Separation technique", "Crystallization method"], correct: 1 },
    { question: "Maceration involves:", options: ["Continuous extraction", "Soaking in solvent", "Heating under reflux", "Distillation"], correct: 1 },
    { question: "Percolation involves:", options: ["Soaking only", "Continuous extraction with solvent flow", "Heating", "Freezing"], correct: 1 },
    { question: "Soxhlet extraction uses:", options: ["Continuous hot extraction", "Cold extraction", "Fermentation", "Distillation"], correct: 0 },
    { question: "Supercritical fluid extraction commonly uses:", options: ["Water", "Carbon dioxide", "Nitrogen", "Oxygen"], correct: 1 },
    { question: "Reflux extraction involves:", options: ["Continuous boiling with condenser", "Soaking at room temperature", "Distillation only", "Evaporation only"], correct: 0 },
    { question: "Ultrasonic extraction uses:", options: ["Heat only", "Ultrasound waves", "Pressure only", "Centrifugation"], correct: 1 },
    { question: "Microwave-assisted extraction uses:", options: ["Only microwaves", "Microwaves and solvent", "Only heat", "Only pressure"], correct: 1 },
    { question: "Polar solvents extract:", options: ["Non-polar compounds", "Polar compounds", "Only fats", "Only oils"], correct: 1 },
    { question: "Chromatography separates based on:", options: ["Color only", "Molecular properties and affinity", "Weight only", "Size only"], correct: 1 },
    { question: "Column chromatography uses:", options: ["Paper only", "Solid stationary phase", "Only liquids", "Only gases"], correct: 1 },
    { question: "TLC uses:", options: ["Only one phase", "Thin layer of adsorbent", "Only gas", "Only pressure"], correct: 1 },
    { question: "Crystallization separates based on:", options: ["Color", "Solubility differences", "Weight", "Odor"], correct: 1 },
    { question: "Recrystallization is used to:", options: ["Increase impurity", "Purify compounds", "Break down compounds", "Change color"], correct: 1 },
    { question: "Activated charcoal is used for:", options: ["Adding color", "Decolorization and purification", "Adding flavor", "Adding smell"], correct: 1 },
  ],
  ch28: [
    { question: "Marine pharmacognosy deals with:", options: ["Land plants", "Drugs from marine organisms", "Freshwater organisms", "River organisms only"], correct: 1 },
    { question: "Carrageenan is obtained from:", options: ["Fish", "Seaweeds", "Sponges", "Corals"], correct: 1 },
    { question: "Agar is obtained from:", options: ["Fish", "Seaweeds", "Mollusks", "Crustaceans"], correct: 1 },
    { question: "Alginates are obtained from:", options: ["Fish", "Seaweeds", "Sponges", "Sea cucumbers"], correct: 1 },
    { question: "Fish oil is rich in:", options: ["Vitamin C", "Omega-3 fatty acids", "Protein", "Carbohydrates"], correct: 1 },
    { question: "Marine sponges are known for producing:", options: ["Only vitamins", "Bioactive compounds", "Only minerals", "Only pigments"], correct: 1 },
    { question: "Saxitoxin is produced by:", options: ["Fish", "Dinoflagellates", "Algae only", "Coral only"], correct: 1 },
    { question: "Tetrodotoxin is found in:", options: ["Seaweed", "Pufferfish", "Shark", "Crab"], correct: 1 },
    { question: "Marine toxins can be used as:", options: ["Only poisons", "Pharmacological tools and drugs", "Food additives", "Only for research"], correct: 1 },
    { question: "The biodiversity of oceans is:", options: ["Low", "Very high", "Very low", "Moderate"], correct: 1 },
    { question: "Marine drug discovery faces challenges in:", options: ["Easy collection", "Sustainable harvesting and supply", "Only testing", "Only identification"], correct: 1 },
    { question: "Shark cartilage has been studied for:", options: ["Antibiotic properties", "Anti-angiogenic properties", "Vitamin source", "Protein source"], correct: 1 },
    { question: "Seaweeds are used for:", options: ["Only food", "Food, medicine and industry", "Only medicine", "Only industry"], correct: 1 },
    { question: "Marine fungi produce:", options: ["No bioactive compounds", "Various bioactive compounds", "Only vitamins", "Only pigments"], correct: 1 },
    { question: "Ocean is a source of:", options: ["Only fish", "Novel compounds for drug discovery", "Only minerals", "Only water"], correct: 1 },
  ],
  ch30: [
    { question: "Natural pesticides are obtained from:", options: ["Synthetic sources", "Plants, microorganisms and minerals", "Only chemicals", "Only animals"], correct: 1 },
    { question: "Pyrethrum is obtained from:", options: ["Neem tree", "Chrysanthemum flowers", "Rotenone plant", "Nicotine plant"], correct: 1 },
    { question: "Pyrethrins are:", options: ["Synthetic compounds", "Natural insecticides from chrysanthemum", "Mineral compounds", "Animal compounds"], correct: 1 },
    { question: "Neem contains:", options: ["Only vitamins", "Azadirachtin as active compound", "Only oils", "Only proteins"], correct: 1 },
    { question: "Azadirachtin is found in:", options: ["Pyrethrum", "Neem", "Rotenone plant", "Tobacco"], correct: 1 },
    { question: "Rotenone is obtained from:", options: ["Neem", "Derris and Lonchocarpus species", "Pyrethrum", "Tobacco"], correct: 1 },
    { question: "Botanical pesticides are considered:", options: ["Highly toxic to humans", "Environmentally friendly", "Non-biodegradable", "Synthetic"], correct: 1 },
    { question: "Nicotine as pesticide is obtained from:", options: ["Neem", "Tobacco plant", "Pyrethrum", "Rotenone"], correct: 1 },
    { question: "Essential oils used as pesticides work by:", options: ["Only killing insects", "Repelling, killing or disrupting insects", "Only attracting insects", "Only slowing growth"], correct: 1 },
    { question: "Bacillus thuringiensis (Bt) is a:", options: ["Virus", "Bacterium", "Fungus", "Plant"], correct: 1 },
    { question: "Bt produces toxins that are:", options: ["Harmless to insects", "Insecticidal", "Nutritional", "Neutral"], correct: 1 },
    { question: "Natural pesticides have advantage of:", options: ["Long persistence", "Lower environmental impact", "Higher toxicity", "Synthetic origin"], correct: 1 },
    { question: "Organic farming uses:", options: ["Only synthetic pesticides", "Natural pesticides and methods", "No pesticides", "Only chemical fertilizers"], correct: 1 },
    { question: "The mode of action of botanical pesticides is often:", options: ["Non-specific", "Specific", "Unknown", "Always the same"], correct: 1 },
    { question: "Natural pesticides may have drawback of:", options: ["High cost", "Lower potency and stability", "Toxicity to humans", "Environmental damage"], correct: 1 },
  ],
  ch31: [
    { question: "Poisonous plants contain:", options: ["Only vitamins", "Toxic secondary metabolites", "Only sugars", "No active compounds"], correct: 1 },
    { question: "Ricin is found in:", options: ["Atropine plant", "Castor beans", "Digitalis", "Oleander"], correct: 1 },
    { question: "Digitalis contains:", options: ["Ricin", "Cardiac glycosides", "Alkaloids", "Cyanogenic glycosides"], correct: 1 },
    { question: "Oleander is poisonous due to:", options: ["Cardiac glycosides", "Alkaloids only", "Tannins only", "Resins only"], correct: 0 },
    { question: "Belladonna contains:", options: ["Glycosides", "Tropane alkaloids", "Cyanogenic glycosides", "Resins"], correct: 1 },
    { question: "Atropine is obtained from:", options: ["Digitalis", "Belladonna", "Castor bean", "Oleander"], correct: 1 },
    { question: "Poison ivy contains:", options: ["Alkaloids", "Urushiol", "Glycosides", "Tannins"], correct: 1 },
    { question: "Treatment of plant poisoning involves:", options: ["Giving more toxin", "Symptomatic and supportive care", "No treatment", "Using more plants"], correct: 1 },
    { question: "Jimsonweed (Datura) contains:", options: ["Cardiac glycosides", "Tropane alkaloids", "Cyanogenic glycosides", "Saponins"], correct: 1 },
    { question: "Monkshood (Aconitum) contains:", options: ["Glycosides", "Aconitine", "Atropine", "Quinine"], correct: 1 },
    { question: "Foxglove contains:", options: ["Alkaloids", "Cardiac glycosides", "Saponins", "Tannins"], correct: 1 },
    { question: "First aid for plant poisoning includes:", options: ["Giving more poison", "Inducing vomiting if indicated and seeking help", "Waiting only", "Applying to skin only"], correct: 1 },
    { question: "Some poisonous plants are also:", options: ["Non-medicinal", "Sources of useful medicines", "Always fatal", "Never studied"], correct: 1 },
    { question: "Aconitine is:", options: ["A sweetener", "A highly toxic alkaloid", "A vitamin", "A mineral"], correct: 1 },
    { question: "Knowledge of poisonous plants is important for:", options: ["Only avoidance", "Avoidance and potential medicinal use", "Only killing", "No importance"], correct: 1 },
  ],
  ch32: [
    { question: "Natural allergens are substances that:", options: ["Provide nutrition", "Trigger immune reactions in susceptible individuals", "Are always toxic", "Have no effect"], correct: 1 },
    { question: "Pollen allergy is commonly due to:", options: ["All pollen equally", "Wind-pollinated plants", "Insect-pollinated plants", "No specific type"], correct: 1 },
    { question: "Hay fever is caused by:", options: ["Hay", "Pollen and mold spores", "Dust only", "Only animal dander"], correct: 1 },
    { question: "Latex allergy is triggered by:", options: ["Synthetic rubber", "Natural rubber latex", "Plastic", "Cotton"], correct: 1 },
    { question: "Bee venom is an example of:", options: ["Plant allergen", "Animal allergen", "Food allergen", "Chemical allergen"], correct: 1 },
    { question: "Histamine is released during:", options: ["Allergic reactions", "Only infections", "Only trauma", "No reactions"], correct: 0 },
    { question: "IgE is:", options: ["An antibody", "A hormone", "An enzyme", "A toxin"], correct: 0 },
    { question: "Type I hypersensitivity is:", options: ["Delayed reaction", "Immediate allergic reaction", "Cell-mediated reaction", "Antibody-mediated damage"], correct: 1 },
    { question: "Mast cells release:", options: ["Insulin", "Histamine", "Cortisol", "Adrenaline"], correct: 1 },
    { question: "Antihistamines work by:", options: ["Killing mast cells", "Blocking histamine receptors", "Increasing histamine", "Destroying IgE"], correct: 1 },
    { question: "Allergy skin prick test involves:", options: ["Injecting allergen", "Introducing allergen to skin and observing reaction", "Blood test only", "No direct contact"], correct: 1 },
    { question: "Immunotherapy for allergies involves:", options: ["Avoiding all allergens", "Desensitization with gradually increasing allergen doses", "Taking steroids only", "No treatment"], correct: 1 },
    { question: "Dust mite allergens are found in:", options: ["Only old buildings", "House dust and bedding", "Only outdoor areas", "Only pets"], correct: 1 },
    { question: "Mold allergens are:", options: ["Only in food", "Airborne fungi spores", "Only in water", "Not significant"], correct: 1 },
    { question: "Allergies can be prevented by:", options: ["Complete avoidance always", "Reducing exposure and proper management", "Taking antibiotics", "No prevention possible"], correct: 1 },
  ],
  ch33: [
    { question: "Natural colors are obtained from:", options: ["Only synthetic sources", "Plants, animals and minerals", "Only chemicals", "Only rocks"], correct: 1 },
    { question: "Cochineal is a natural dye obtained from:", options: ["Plants", "Insects", "Minerals", "Fungi"], correct: 1 },
    { question: "Carmine is derived from:", options: ["Turmeric", "Cochineal insects", "Beetroot", "Indigo plant"], correct: 1 },
    { question: "Indigo is a natural dye obtained from:", options: ["Insects", "Indigofera plant", "Minerals", "Fungi"], correct: 1 },
    { question: "Turmeric provides:", options: ["Blue color", "Yellow color", "Red color", "Green color"], correct: 1 },
    { question: "Saffron provides:", options: ["Yellow color", "Red color only", "Blue color", "Green color"], correct: 0 },
    { question: "Betanin is found in:", options: ["Turmeric", "Beetroot", "Indigo", "Cochineal"], correct: 1 },
    { question: "Chlorophyll provides:", options: ["Red color", "Green color", "Yellow color", "Blue color"], correct: 1 },
    { question: "Carotene provides:", options: ["Green color", "Orange/red color", "Blue color", "Purple color"], correct: 1 },
    { question: "Alizarin is a natural dye from:", options: ["Madder plant", "Indigo", "Turmeric", "Cochineal"], correct: 0 },
    { question: "Natural dyes are generally:", options: ["More toxic than synthetic", "Less toxic than synthetic", "Always safe", "Not used anymore"], correct: 1 },
    { question: "Annatto provides:", options: ["Blue color", "Yellow to orange color", "Red color", "Green color"], correct: 1 },
    { question: "Natural dyes are used in:", options: ["Only food", "Food, textiles and cosmetics", "Only textiles", "Only cosmetics"], correct: 1 },
    { question: "The safety of natural dyes is due to:", options: ["Lack of testing", "Generally recognized as safe", "No regulation needed", "They are always pure"], correct: 1 },
    { question: "Some natural dyes can cause:", options: ["No reactions", "Allergic reactions in some people", "Only good effects", "No health effects"], correct: 1 },
  ],
  ch34: [
    { question: "Hallucinogenic plants contain compounds that affect:", options: ["Only the body", "The brain and perception", "Only digestion", "Only circulation"], correct: 1 },
    { question: "Psilocybin is found in:", options: ["Peyote", "Magic mushrooms", "Cannabis", "Morning glory"], correct: 1 },
    { question: "Mescaline is found in:", options: ["Mushrooms", "Peyote cactus", "Cannabis", "Morning glory seeds"], correct: 1 },
    { question: "LSD is:", options: ["A plant extract", "A synthetic compound derived from fungus", "A mineral", "An animal product"], correct: 1 },
    { question: "DMT is found in:", options: ["Only peyote", "Various plants including ayahuasca ingredients", "Only mushrooms", "Only cannabis"], correct: 1 },
    { question: "Ayahuasca is a traditional brew containing:", options: ["Psilocybin", "DMT and MAO inhibitors", "LSD only", "Mescaline only"], correct: 1 },
    { question: "The primary psychoactive compound in cannabis is:", options: ["CBD only", "THC", "CBN", "CBC"], correct: 1 },
    { question: "Hallucinogens primarily affect:", options: ["Dopamine system only", "Serotonin system", "Only adrenaline", "Only GABA"], correct: 1 },
    { question: "Psilocybin is converted to:", options: ["DMT", "Psilocin in the body", "LSD", "Mescaline"], correct: 1 },
    { question: "Traditional use of hallucinogenic plants is found in:", options: ["Only Western culture", "Indigenous cultures for spiritual purposes", "Only modern medicine", "No traditional use"], correct: 1 },
    { question: "Hallucinogenic plants have potential therapeutic use in:", options: ["Only recreation", "Treatment of depression and anxiety", "Treatment of infections", "No therapeutic use"], correct: 1 },
    { question: "Legal status of most hallucinogens is:", options: ["Legal worldwide", "Controlled substances in most countries", "Not regulated", "Legal for medical use only"], correct: 1 },
    { question: "Hallucinogens can be dangerous due to:", options: ["No risks", "Unpredictable effects and potential harm", "Only mild effects", "No psychological effects"], correct: 1 },
    { question: "Addiction potential of hallucinogens is generally:", options: ["Very high", "Lower than many substances", "Equal to nicotine", "Non-existent"], correct: 1 },
    { question: "Research on hallucinogens is:", options: ["Completely stopped", "Ongoing for therapeutic potential", "Only in animals", "Not scientifically valuable"], correct: 1 },
  ],
};

type AppState = "chapters" | "quiz" | "complete";

export default function Home() {
  const [state, setState] = useState<AppState>("chapters");
  const [currentChapter, setCurrentChapter] = useState<Chapter | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [hearts, setHearts] = useState(5);
  const [streak, setStreak] = useState(0);
  const [xp, setXp] = useState(0);
  const [completedChapters, setCompletedChapters] = useState<string[]>([]);
  const [animated] = useState(true);

  const questions = currentChapter ? quizzes[currentChapter.id] || [] : [];
  const question = questions[currentQuestion];

  const phases = ["A", "B", "C", "D", "F", "I"];
  const phaseNames: Record<string, string> = {
    A: "Introduction",
    B: "Pharmaceutical Botany",
    C: "Extraction & Isolation",
    D: "Analytical Pharmacognosy",
    F: "Crude Drugs",
    I: "Miscellaneous",
  };

  const handleChapterClick = (chapter: Chapter) => {
    setCurrentChapter(chapter);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setState("quiz");
  };

  const handleAnswer = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
    setShowFeedback(true);

    if (index === question.correct) {
      setXp((x) => x + 10);
      setStreak((s) => s + 1);
    } else {
      setHearts((h) => Math.max(0, h - 1));
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((q) => q + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      if (currentChapter && !completedChapters.includes(currentChapter.id)) {
        setCompletedChapters((c) => [...c, currentChapter.id]);
      }
      setState("complete");
    }
  };

  const handleBackToChapters = () => {
    setState("chapters");
    setCurrentChapter(null);
  };

  const getOptionStyle = (index: number) => {
    if (!showFeedback) {
      return selectedAnswer === index ? "border-[#58CC02] bg-[#D7F5D7] shadow-lg scale-[1.02]" : "border-[#E5E5E5] hover:border-[#58CC02] hover:shadow-md hover:scale-[1.01]";
    }
    if (index === question.correct) return "border-[#58CC02] bg-[#D7F5D7] shadow-lg";
    if (index === selectedAnswer && index !== question.correct) return "border-[#FF4B4B] bg-[#FFD6D6] shadow-lg";
    return "border-[#E5E5E5] opacity-50";
  };

  if (state === "complete") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFFEF5] via-[#FFF9E6] to-[#FFF3CC]">
        <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-200 p-4 flex justify-between items-center z-50 shadow-sm">
          <button onClick={handleBackToChapters} className="text-[#58CC02] font-bold text-lg hover:scale-105 transition-transform">← Back</button>
          <div className="flex gap-4">
            <span className="flex items-center gap-1 text-lg font-semibold" style={{ color: "#FF9600" }}>🔥 {streak}</span>
            <span className="flex items-center gap-1 text-lg font-semibold" style={{ color: "#58CC02" }}>⭐ {xp}</span>
            <span className="flex items-center gap-1 text-lg font-semibold" style={{ color: "#FF4B4B" }}>❤️ {hearts}</span>
          </div>
        </header>
        <main className="pt-32 px-5 max-w-[600px] mx-auto pb-8 flex flex-col items-center justify-center min-h-[80vh] text-center">
          <div className="animate-bounce text-8xl mb-6">🎉</div>
          <div className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-[#58CC02] mb-6 w-full">
            <h1 className="text-4xl font-black text-[#3C3C3C] mb-4">Chapter Complete!</h1>
            <p className="text-xl text-[#777] mb-6">You earned <span className="text-[#58CC02] font-bold">{questions.length * 10} XP</span></p>
            <div className="flex justify-center gap-4 mb-4">
              <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-xl px-4 py-2 flex items-center gap-2">
                <span>🔥</span> <span className="font-bold">{streak}</span>
              </div>
              <div className="bg-gradient-to-r from-green-400 to-green-500 text-white rounded-xl px-4 py-2 flex items-center gap-2">
                <span>⭐</span> <span className="font-bold">{xp}</span>
              </div>
            </div>
          </div>
          <button
            onClick={handleBackToChapters}
            className="bg-gradient-to-r from-[#58CC02] to-[#65DF0A] text-white font-bold py-4 px-12 rounded-2xl border-b-4 border-[#46A302] hover:border-b-0 hover:translate-y-1 transition-all shadow-xl"
          >
            Continue
          </button>
        </main>
      </div>
    );
  }

  if (state === "quiz" && currentChapter && question) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFFEF5] via-[#FFF9E6] to-[#FFF3CC]">
        <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-200 p-4 flex justify-between items-center z-50 shadow-sm">
          <button onClick={handleBackToChapters} className="text-[#58CC02] font-bold text-lg hover:scale-105 transition-transform">← Quit</button>
          <div className="flex-1 mx-4 bg-gray-200 h-3 rounded-full overflow-hidden shadow-inner">
            <div
              className="bg-gradient-to-r from-[#58CC02] to-[#65DF0A] h-full transition-all duration-500 ease-out"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
          <div className="flex gap-4">
            <span className="flex items-center gap-1 text-lg font-semibold" style={{ color: "#FF9600" }}>🔥 {streak}</span>
            <span className="flex items-center gap-1 text-lg font-semibold" style={{ color: "#58CC02" }}>⭐ {xp}</span>
            <span className="flex items-center gap-1 text-lg font-semibold" style={{ color: "#FF4B4B" }}>❤️ {hearts}</span>
          </div>
        </header>
        <main className="pt-24 px-5 max-w-[600px] mx-auto pb-8">
          <div className="bg-white rounded-3xl p-6 shadow-lg border-2 border-gray-100 mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[#777] text-sm font-medium">Question {currentQuestion + 1} of {questions.length}</span>
              <span className="bg-gradient-to-r from-[#58CC02] to-[#65DF0A] text-white text-xs font-bold px-3 py-1 rounded-full">
                {currentChapter.title}
              </span>
            </div>
            <h2 className="text-2xl text-[#3C3C3C] font-bold leading-relaxed">{question.question}</h2>
          </div>
          <div className="flex flex-col gap-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={showFeedback}
                className={`border-2 rounded-2xl p-5 text-left transition-all duration-200 ${getOptionStyle(index)}`}
              >
                <div className="flex items-center gap-4">
                  <span className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center font-bold text-lg text-[#3C3C3C]">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="text-lg font-medium text-[#3C3C3C]">{option}</span>
                </div>
              </button>
            ))}
          </div>
          {showFeedback && (
            <div className="mt-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className={`p-5 rounded-2xl mb-4 shadow-lg ${selectedAnswer === question.correct ? "bg-gradient-to-r from-green-100 to-green-50 border-2 border-green-300" : "bg-gradient-to-r from-red-100 to-red-50 border-2 border-red-300"}`}>
                <h3 className="font-black text-xl mb-2">
                  {selectedAnswer === question.correct ? "🎉 Correct!" : "❌ Not quite!"}
                </h3>
                <p className="text-[#555]">
                  {selectedAnswer === question.correct
                    ? "Great job! Keep going!"
                    : `The correct answer is ${String.fromCharCode(65 + question.correct)}: ${question.options[question.correct]}`}
                </p>
              </div>
              <button
                onClick={handleNext}
                className="w-full bg-gradient-to-r from-[#58CC02] to-[#65DF0A] text-white font-bold py-4 rounded-2xl border-b-4 border-[#46A302] hover:border-b-0 hover:translate-y-1 transition-all shadow-xl text-lg"
              >
                {currentQuestion < questions.length - 1 ? "Continue →" : "Finish ✨"}
              </button>
            </div>
          )}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFEF5] via-[#FFF9E6] to-[#FFF3CC]">
      <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-gray-200 p-4 flex justify-between items-center z-50 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-[#58CC02] to-[#46A302] rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-md">
            P
          </div>
          <span className="font-black text-2xl text-[#3C3C3C]">PharmaQuest</span>
        </div>
        <div className="flex gap-4">
          <span className="flex items-center gap-1 text-lg font-bold" style={{ color: "#FF9600" }}>🔥 {streak}</span>
          <span className="flex items-center gap-1 text-lg font-bold" style={{ color: "#58CC02" }}>⭐ {xp}</span>
          <span className="flex items-center gap-1 text-lg font-bold" style={{ color: "#FF4B4B" }}>❤️ {hearts}</span>
        </div>
      </header>
      <main className="pt-28 px-5 max-w-[600px] mx-auto pb-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-[#3C3C3C] mb-3">Learn Pharmacognosy</h1>
          <p className="text-lg text-[#777]">Master the science of natural drugs</p>
        </div>
        
        {phases.map((phase, phaseIndex) => (
          <div 
            key={phase} 
            className={`mb-8 transform transition-all duration-500 ${animated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            style={{ transitionDelay: `${phaseIndex * 100}ms` }}
          >
            <div className={`flex items-center gap-3 mb-4`}>
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${phaseColors[phase]} flex items-center justify-center text-white font-bold shadow-md`}>
                {phase}
              </div>
              <h2 className="text-xl font-black text-[#3C3C3C]">Part {phase}: {phaseNames[phase]}</h2>
            </div>
            <div className="flex flex-col gap-3">
              {chapters
                .filter((ch) => ch.phase === phase)
                .map((chapter, index) => (
                  <div
                    key={chapter.id}
                    onClick={() => handleChapterClick(chapter)}
                    className={`group bg-white rounded-2xl p-4 flex items-center gap-4 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-2 border-transparent hover:border-[#58CC02] ${animated ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                    style={{ transitionDelay: `${(phaseIndex * 100) + (index * 50)}ms` }}
                  >
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${phaseColors[phase]} flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform`}>
                      {completedChapters.includes(chapter.id) ? "✅" : chapter.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-[#3C3C3C] mb-1">{chapter.title}</h3>
                      <p className="text-sm text-[#777]">{chapter.desc}</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-[#F0F0F0] flex items-center justify-center text-[#58CC02] font-bold group-hover:bg-[#58CC02] group-hover:text-white transition-all">
                      →
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
        
        <div className="text-center mt-12 pb-8">
          <p className="text-[#999] text-sm">📚 {chapters.length} Chapters • 💯 {chapters.length * 50} Questions</p>
        </div>
      </main>
    </div>
  );
}
