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

const quizData: Record<string, { question: string; options: string[]; correct: number }[]> = {
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
    { question: "The scope of pharmacognosy includes:", options: ["Only identification of drugs", "Identification, cultivation, extraction and quality control", "Drug manufacturing only", "Marketing of drugs"], correct: 1 },
    { question: "Who is credited with founding the modern pharmaceutical sciences?", options: ["William C. Evans", "Peter J. S. Nigel", "Galen", "Avicenna"], correct: 0 },
    { question: "Traditional medicine is recognized by:", options: ["Only WHO", "WHO and many governments", "No organization", "Only pharmaceutical companies"], correct: 1 },
    { question: "The historical development of pharmacognosy began with:", options: ["Chemical synthesis", "Use of medicinal plants", "DNA technology", "Genetic engineering"], correct: 1 },
    { question: "Which civilization used garlic medicinally?", options: ["Only Egyptians", "Egyptians, Greeks and Romans", "Only Greeks", "Only Chinese"], correct: 1 },
    { question: "The Ebers Papyrus contains:", options: ["Surgical techniques", "Medicinal plant formulas", "Chemical reactions", "Astronomical data"], correct: 1 },
    { question: "Avicenna wrote:", options: ["De Materia Medica", "The Canon of Medicine", "Herbarium", "Pharmakopoeia"], correct: 1 },
    { question: "Which period saw the decline of herbal medicine in Europe?", options: ["Renaissance", "Middle Ages", "19th century", "21st century"], correct: 2 },
    { question: "The revival of herbal medicine began in:", options: ["18th century", "19th century", "20th century", "21st century"], correct: 1 },
    { question: "Modern pharmacognosy combines traditional knowledge with:", options: ["Only modern chemistry", "Analytical techniques and research", "Only marketing", "Manufacturing only"], correct: 1 },
    { question: "WHO Traditional Medicine Strategy focuses on:", options: ["Replacing modern medicine", "Integration and quality assurance", "Banning traditional medicine", "Patent rights only"], correct: 1 },
    { question: "Pharmacognosy education includes:", options: ["Only botany", "Botany, chemistry, pharmacology and quality control", "Only chemistry", "Business management"], correct: 1 },
    { question: "Drugs from natural sources are preferred because:", options: ["Always safer", "Often have fewer side effects", "Always cheaper", "Never interact with other drugs"], correct: 1 },
    { question: "The future of pharmacognosy involves:", options: ["Declining importance", "Drug discovery from biodiversity", "Only quality control", "Replacing all medicine"], correct: 1 },
    { question: "Herbal drugs can interact with:", options: ["No modern drugs", "Prescription and over-the-counter drugs", "Only vitamins", "Only supplements"], correct: 1 },
    { question: "Standardization of herbal drugs is important for:", options: ["Making them expensive", "Ensuring consistent efficacy and safety", "Patent purposes", "Marketing only"], correct: 1 },
    { question: "Good Agricultural Practice (GAP) ensures:", options: ["Maximum profit", "Quality and safety of medicinal plants", "Faster growth", "Larger harvest"], correct: 1 },
    { question: "Post-harvest processing affects:", options: ["Only appearance", "Drug quality and potency", "Only color", "Only weight"], correct: 1 },
    { question: "Storage conditions for crude drugs should:", options: ["Be humid", "Control temperature and moisture", "Be in bright light", "Be at room temperature always"], correct: 1 },
    { question: "Drug adulteration in history was primarily for:", options: ["Safety", "Profit", "Quality", "Research"], correct: 1 },
    { question: "The Renaissance period contributed to pharmacognosy through:", options: ["Decline of botany", "Discovery of new plants from the Americas", "Elimination of herbal medicine", "Chemical synthesis"], correct: 1 },
    { question: "Linnaeus contributed to pharmacognosy by:", options: ["Synthesizing compounds", "Developing plant classification", "Manufacturing drugs", "Marketing herbs"], correct: 1 },
    { question: "The 19th century advances in chemistry led to:", options: ["Decline of pharmacognosy", "Isolation of active compounds from plants", "End of herbal medicine", "Elimination of natural products"], correct: 1 },
    { question: "Morphine was isolated from opium in:", options: ["17th century", "18th century", "19th century", "20th century"], correct: 2 },
    { question: "Quinine was isolated from cinchona in:", options: ["17th century", "18th century", "19th century", "20th century"], correct: 2 },
    { question: "The discovery of penicillin influenced pharmacognosy by:", options: ["Focusing on natural antibiotics", "Eliminating plant research", "Replacing natural products", "Reducing drug discovery"], correct: 0 },
    { question: "Reverse pharmacology in drug discovery uses:", options: ["Only synthetic compounds", "Traditional knowledge as starting point", "Only clinical trials", "Manufacturing processes"], correct: 1 },
    { question: "Biodiversity provides potential for:", options: ["Less drug discovery", "New drug leads", "Reduced research", "Fewer compounds"], correct: 1 },
    { question: "Conservation of medicinal plants is important because:", options: ["They have no economic value", "Many are endangered and valuable sources", "They grow easily", "They are not useful"], correct: 1 },
    { question: "Sustainable harvesting ensures:", options: ["Maximum short-term profit", "Long-term availability of plant resources", "Faster regrowth", "Lower costs"], correct: 1 },
    { question: "The global market for herbal medicines is:", options: ["Declining", "Growing steadily", "Non-existent", "Stable"], correct: 1 },
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
    { question: "Ayurvedic medicines are prepared from:", options: ["Only synthetic compounds", "Plants, minerals and animal products", "Only chemicals", "Only plants"], correct: 1 },
    { question: "The five elements in Ayurveda include:", options: ["Earth, Water, Fire, Air, Ether", "Sun, Moon, Stars, Sky, Ground", "Hot, Cold, Wet, Dry, Neutral", "Acid, Base, Salt, Water, Fire"], correct: 0 },
    { question: "Unani medicine uses:", options: ["Only herbal remedies", "Herbal, mineral and animal-based drugs", "Only chemical drugs", "Only surgical methods"], correct: 1 },
    { question: "Which Indian text describes Ayurveda?", options: ["Vedas", "Charaka Samhita and Sushruta Samhita", "Bible", "Quran"], correct: 1 },
    { question: "TCM diagnosis methods include:", options: ["Only blood tests", "Observation, listening, questioning and pulse diagnosis", "Only MRI", "Only X-rays"], correct: 1 },
    { question: "Meridians in TCM are:", options: ["Blood vessels", "Energy pathways", "Nerves only", "Bones"], correct: 1 },
    { question: "Qi in TCM represents:", options: ["Blood", "Vital energy", "Only oxygen", "Hormones"], correct: 1 },
    { question: "The principle of 'like cures like' means:", options: ["Treating opposites with opposites", "Treating similar with similar", "Using toxins for toxins", "Using surgery for all"], correct: 1 },
    { question: "Homeopathic remedies are:", options: ["Highly concentrated", "Highly diluted", "Chemically synthesized", "Chemically altered"], correct: 1 },
    { question: "Naturopathy believes in:", options: ["Only drug therapy", "The body's ability to heal itself", "Surgery as first option", "Only radiation therapy"], correct: 1 },
    { question: "Which is a modality of Naturopathy?", options: ["Chemotherapy", "Hydrotherapy, nutrition and herbal medicine", "Radiation therapy", "Surgery"], correct: 1 },
    { question: "Ayurvedic prakriti refers to:", options: ["Disease", "Body constitution", "Treatment method", "Herbal preparation"], correct: 1 },
    { question: "Which dosha is associated with air and movement?", options: ["Pitta", "Kapha", "Vata", "All doshas"], correct: 2 },
    { question: "Pitta dosha is associated with:", options: ["Cold and stability", "Fire and metabolism", "Air and movement", "Water and structure"], correct: 1 },
    { question: "Kapha dosha is associated with:", options: ["Fire and energy", "Air and movement", "Water and earth, structure and stability", "Only air"], correct: 2 },
    { question: "The four humors in Unani are:", options: ["Blood, Phlegm, Yellow bile, Black bile", "Water, Fire, Air, Earth", "Hot, Cold, Wet, Dry", "Pulse, Heart, Liver, Brain"], correct: 0 },
    { question: "Tibb-e-Unani is another name for:", options: ["Ayurveda", "Traditional Chinese Medicine", "Unani medicine", "Homeopathy"], correct: 2 },
    { question: "Moxibustion in TCM involves:", options: ["Acupuncture with heat", "Only needle insertion", "Bloodletting", "Surgery"], correct: 0 },
    { question: "Tai chi is a:", options: ["Herbal tea", "Mind-body exercise practice", "Surgical technique", "Diagnostic method"], correct: 1 },
    { question: "Qigong combines:", options: ["Only breathing exercises", "Movement, breathing and meditation", "Only herbal medicine", "Only acupuncture"], correct: 1 },
    { question: "Shiatsu is a form of:", options: ["Herbal medicine", "Traditional Japanese bodywork", "Surgery", "Radiation therapy"], correct: 1 },
    { question: "Reflexology focuses on:", options: ["Internal organs", "Specific points on feet and hands", "Blood pressure", "Only head"], correct: 1 },
    { question: "The concept of meridians is unique to:", options: ["Ayurveda", "TCM and related Asian systems", "Western medicine", "Homeopathy"], correct: 1 },
    { question: "Acupressure uses:", options: ["Needles", "Pressure on points", "Surgery", "Radiation"], correct: 1 },
    { question: "Cupping therapy in TCM involves:", options: ["Injections", "Creating suction on skin", "Taking pills", "Blood transfusions"], correct: 1 },
    { question: "Herbal medicine in the West gained popularity due to:", options: ["Government mandates", "Interest in natural and holistic approaches", "Lack of modern medicine", "Lower costs only"], correct: 1 },
    { question: "Regulation of traditional medicine varies:", options: ["None exists", "By country and region", "Is the same globally", "Is not important"], correct: 1 },
    { question: "Evidence-based traditional medicine uses:", options: ["No research", "Scientific studies to validate practices", "Only historical texts", "Marketing claims"], correct: 1 },
    { question: "The safety of traditional medicine depends on:", options: ["Age of the system", "Proper use and quality control", "Price of the medicine", "Packaging only"], correct: 1 },
    { question: "Training for traditional medicine practitioners:", options: ["Is standardized globally", "Varies by country and system", "Does not exist", "Is the same as conventional doctors"], correct: 1 },
    { question: "Traditional medicine can work alongside conventional medicine through:", options: ["Competition", "Integrated healthcare approaches", "Replacing one with the other", "Avoiding patient choice"], correct: 1 },
    { question: "The economic value of traditional medicine is:", options: ["Negligible", "Significant and growing", "Declining rapidly", "Non-measurable"], correct: 1 },
    { question: "Biopiracy refers to:", options: ["Legal use of traditional knowledge", "Unauthorized patenting of traditional knowledge", "Sharing of medicine", "Cooperation between countries"], correct: 1 },
    { question: "Traditional knowledge digital library helps to:", options: ["Hide traditional knowledge", "Protect and share traditional knowledge ethically", "Prevent all use", "Replace traditional healers"], correct: 1 },
    { question: "The future relationship between traditional and modern medicine is likely to be:", options: ["One replacing the other", "More integrative", "Increasingly separate", "Of no relevance"], correct: 1 },
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
    { question: "Therapeutic classification is based on:", options: ["Chemical nature", "Pharmacological effect and clinical use", "Geographical origin", "Plant family"], correct: 1 },
    { question: "Morphological classification considers:", options: ["Active constituents", "Plant parts like root, leaf, bark", "Geographical source", "Molecular structure"], correct: 1 },
    { question: "Alphabetical classification arranges drugs by:", options: ["Chemical structure", "First letter of name", "Therapeutic use", "Geographical origin"], correct: 1 },
    { question: "Biological classification of drugs considers:", options: ["Chemical structure", "Source organism", "Molecular weight", "Solubility"], correct: 1 },
    { question: "Drugs of animal origin include:", options: ["Only insects", "Animal tissues and products", "Only fish", "Only mammals"], correct: 1 },
    { question: "Drugs of mineral origin include:", options: ["Organic compounds", "Inorganic substances", "Only vitamins", "Only proteins"], correct: 1 },
    { question: "Natural product classification includes:", options: ["Only primary metabolites", "Primary and secondary metabolites", "Only synthetic compounds", "Only metals"], correct: 1 },
    { question: "Terpenes are classified based on:", options: ["Number of isoprene units", "Color", "Odor only", "Solubility"], correct: 0 },
    { question: "Monoterpenes have how many isoprene units?", options: ["1", "2", "3", "4"], correct: 1 },
    { question: "Sesquiterpenes have how many isoprene units?", options: ["1", "2", "3", "4"], correct: 2 },
    { question: "Diterpenes have how many isoprene units?", options: ["2", "3", "4", "5"], correct: 2 },
    { question: "Triterpenes have how many isoprene units?", options: ["3", "4", "5", "6"], correct: 3 },
    { question: "Which is not a type of alkaloid?", options: ["Indole", "Quinoline", "Carbohydrate", "Tropane"], correct: 2 },
    { question: "Phenolic compounds include:", options: ["Only sugars", "Flavonoids, lignans and phenols", "Only lipids", "Only proteins"], correct: 1 },
    { question: "Flavonoids are:", options: ["Alkaloids", "Phenolic compounds", "Terpenes", "Glycosides"], correct: 1 },
    { question: "Steroids are chemically:", options: ["Terpenes", "Lipids", "Carbohydrates", "Proteins"], correct: 0 },
    { question: "Vitamins from natural sources include:", options: ["Only vitamin C", "Vitamins A, D, E and K", "Only B vitamins", "All are synthetic"], correct: 1 },
    { question: "Enzymes as drugs are:", options: ["Carbohydrates", "Proteins", "Lipids", "Vitamins"], correct: 1 },
    { question: "Antibiotics from natural sources include:", options: ["Only synthetic", "Penicillin, tetracycline and streptomycin", "Only sulfa drugs", "All are synthetic"], correct: 1 },
    { question: "The combined classification system uses:", options: ["Only chemical nature", "Multiple approaches for better identification", "Only alphabetical", "Only therapeutic use"], correct: 1 },
    { question: "Which classification is most useful for drug identification?", options: ["Alphabetical", "Chemical", "All have value", "Therapeutic"], correct: 2 },
    { question: "Modern drug classification increasingly uses:", options: ["Only morphology", "Chemical constituents and pharmacological action", "Only alphabetical", "Only therapeutic use"], correct: 1 },
    { question: "The advantage of pharmacological classification is:", options: ["Easy identification", "Relates to clinical use", "Based on structure", "Based on source"], correct: 1 },
    { question: "The disadvantage of morphological classification is:", options: ["Easy to use", "Different drugs with similar morphology may have different uses", "Clear grouping", "Simple to understand"], correct: 1 },
    { question: "Pharmacognosy primarily uses which classification?", options: ["Alphabetical", "Chemical and morphological", "Only therapeutic", "Only alphabetical"], correct: 1 },
    { question: "Drugs can be classified based on:", options: ["One criterion only", "Multiple criteria depending on purpose", "Only chemical structure", "Only color"], correct: 1 },
    { question: "The traditional classification of drugs in pharmacognosy is:", options: ["Based on chemical nature", "Based on morphology and taxonomy", "Based on patent status", "Based on price"], correct: 1 },
    { question: "Which is a benefit of chemical classification?", options: ["Groups drugs with similar properties", "Always simple", "Based on appearance", "No benefit"], correct: 0 },
    { question: "Different classification systems serve different:", options: ["Purposes", "People only", "Countries only", "No purpose"], correct: 0 },
    { question: "The best classification system would be:", options: ["One that fits all needs", "Comprehensive and multidimensional", "Only alphabetical", "Only morphological"], correct: 1 },
    { question: "Modern pharmacognosy uses:", options: ["Only traditional methods", "Combination of traditional and modern analytical methods", "Only modern methods", "No methods"], correct: 1 },
    { question: "Quality control in pharmacognosy uses classification to:", options: ["Confuse identification", "Ensure proper identification and standardization", "Increase cost", "Avoid testing"], correct: 1 },
    { question: "Drugs containing similar constituents are often grouped together for:", options: ["Marketing only", "Therapeutic and identification purposes", "Confusion", "No reason"], correct: 1 },
    { question: "The relationship between chemical classification and pharmacological effect is:", options: ["Always direct", "Often related but not always predictable", "Never related", "Always opposite"], correct: 1 },
    { question: "Classification helps in:", options: ["Only selling drugs", "Identification, standardization and therapeutic use", "Increasing prices", "Reducing research"], correct: 1 },
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
    { question: "Chloroplasts are responsible for:", options: ["Water transport", "Photosynthesis", "Reproduction", "Support"], correct: 1 },
    { question: "Vascular bundles in stems contain:", options: ["Only xylem", "Xylem and phloem", "Only phloem", "Only cortex"], correct: 1 },
    { question: "Root hairs function in:", options: ["Photosynthesis", "Water and mineral absorption", "Food storage", "Reproduction"], correct: 1 },
    { question: "Leaves are specialized for:", options: ["Water transport", "Gas exchange and photosynthesis", "Support only", "Reproduction"], correct: 1 },
    { question: "The stigma in a flower is:", options: ["Male reproductive part", "Female reproductive part", "Leaf modification", "Stem modification"], correct: 1 },
    { question: "Pollen grains contain:", options: ["Female gametes", "Male gametes", "Only proteins", "Only sugars"], correct: 1 },
    { question: "Seeds contain:", options: ["Only one part", "Embryo, endosperm and seed coat", "Only endosperm", "Only embryo"], correct: 1 },
    { question: "Germination is:", options: ["Formation of flower", "Growth of embryo into seedling", "Formation of seed", "Death of plant"], correct: 1 },
    { question: "Pollination is:", options: ["Seed formation", "Transfer of pollen to stigma", "Fruit formation", "Leaf formation"], correct: 1 },
    { question: "Vegetative propagation involves:", options: ["Seeds", "Plant parts like stems and roots", "Flowers only", "Pollination"], correct: 1 },
    { question: "Rhizomes are:", options: ["Underground stems", "Above-ground stems", "Leaves", "Roots only"], correct: 0 },
    { question: "Tubers are:", options: ["Underground stems or roots", "Leaves", "Flowers", "Seeds"], correct: 0 },
    { question: "Bulbs are:", options: ["Underground stems with leaves", "Roots only", "Flowers only", "Seeds"], correct: 0 },
    { question: "Corms are:", options: ["Underground stems", "Roots only", "Leaves only", "Flowers"], correct: 0 },
    { question: "Plant hormones include:", options: ["Only auxins", "Auxins, gibberellins, cytokinins, ethylene and abscisic acid", "Only gibberellins", "Only cytokinins"], correct: 1 },
    { question: "Auxins promote:", options: ["Root formation only", "Cell elongation and root formation", "Flowering only", "Fruit drop"], correct: 1 },
    { question: "Gibberellins affect:", options: ["Only root growth", "Stem elongation and germination", "Leaf fall only", "Root branching only"], correct: 1 },
    { question: "Cytokinins promote:", options: ["Cell division", "Cell death", "Only root growth", "Leaf fall"], correct: 0 },
    { question: "Ethylene affects:", options: ["Root growth", "Fruit ripening and leaf abscission", "Stem elongation only", "Flower formation only"], correct: 1 },
    { question: "Plant taxonomy organizes plants based on:", options: ["Only medicinal use", "Evolutionary relationships", "Geographical distribution", "Economic value"], correct: 1 },
    { question: "The hierarchy in taxonomy goes from:", options: ["Species to Kingdom", "Kingdom to Species", "Genus to Family", "Order to Class"], correct: 1 },
    { question: "Kingdom is the:", options: ["Most specific rank", "Highest rank", "Middle rank", "Lowest rank"], correct: 1 },
    { question: "Species is defined as:", options: ["Group of genera", "Group of individuals that interbreed", "Group of families", "Group of orders"], correct: 1 },
    { question: "Genus is a group of:", options: ["Many unrelated species", "Related species", "Different families", "Different orders"], correct: 1 },
    { question: "Rosaceae family includes:", options: ["Rose, apple, strawberry", "Mint family only", "Legumes only", "Nightshades only"], correct: 0 },
    { question: "Rubiaceae family includes:", options: ["Coffee plant", "Mint family", "Rose family", "Legume family"], correct: 0 },
    { question: "Euphorbiaceae family includes:", options: ["Castor plant", "Mint family", "Rose family", "Legume family"], correct: 0 },
    { question: "Plant cell wall is composed of:", options: ["Protein", "Cellulose", "Chitin", "Keratin"], correct: 1 },
    { question: "Plastids that contain chlorophyll are:", options: ["Chromoplasts", "Chloroplasts", "Leucoplasts", "Amyloplasts"], correct: 1 },
    { question: "Chromoplasts contain:", options: ["Chlorophyll", "Carotenoid pigments", "Starch", "Water"], correct: 1 },
    { question: "Amyloplasts store:", options: ["Protein", "Lipids", "Starch", "Water"], correct: 2 },
    { question: "Plant vacuoles primarily store:", options: ["DNA", "Water and dissolved substances", "Chlorophyll", "Sugar only"], correct: 1 },
    { question: "Cuticle on leaves is made of:", options: ["Cellulose only", "Waxy substance (cutin)", "Protein", "Starch"], correct: 1 },
    { question: "Laticifers produce:", options: ["Water", "Latex", "Sugar only", "Minerals"], correct: 1 },
    { question: "Stone cells (sclereids) provide:", options: ["Flexibility", "Hardness and support", "Water transport", "Photosynthesis"], correct: 1 },
  ],
  ch10: [
    { question: "Drug adulteration is:", options: ["Proper drug preparation", "Intentional contamination or substitution", "Quality control", "Standardization"], correct: 1 },
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
    { question: "Adulterants can be detected by:", options: ["Taste only", "Microscopic, chemical and chromatographic methods", "Smell only", "Color only"], correct: 1 },
    { question: "Substitution involves replacing:", options: ["Nothing", "Authentic drug with inferior or different substance", "Packaging only", "Label only"], correct: 1 },
    { question: "Addition of adulterants means:", options: ["Removing substances", "Adding substances to increase weight or bulk", "Changing color only", "Changing name only"], correct: 1 },
    { question: "Foreign matter in crude drugs includes:", options: ["Only the drug plant", "Other plant parts, soil and insects", "Only packaging material", "Only labeling"], correct: 1 },
    { question: "Which is commonly adulterated due to high value?", options: ["Common salt", "Saffron and ginseng", "Rice", "Wheat"], correct: 1 },
    { question: "Adulteration with similar looking substances is called:", options: ["Chemical adulteration", "Sophistication", "Contamination", "Deterioration"], correct: 1 },
    { question: "Deterioration of drugs can be caused by:", options: ["Proper storage", "Improper storage, moisture, light and temperature", "Following instructions", "Using preservatives"], correct: 1 },
    { question: "Adulteration with mineral substances includes adding:", options: ["Sugar", "Chalk, talc and lime", "Starch", "Gum"], correct: 1 },
    { question: "Adulteration with animal matter includes adding:", options: ["Only leather", "Horn, bone and shell", "Only fur", "Only feathers"], correct: 1 },
    { question: "Which technique is most sensitive for detecting adulteration?", options: ["Visual examination", "Microscopy", "HPLC and mass spectrometry", "Weighing"], correct: 2 },
    { question: "Finger print analysis using HPLC helps in:", options: ["Identifying color", "Detecting adulteration patterns", "Measuring weight", "Tasting drugs"], correct: 1 },
    { question: "DNA fingerprinting can detect:", options: ["Only color", "Species substitution in herbal drugs", "Only size", "Only shape"], correct: 1 },
    { question: "Proximate analysis determines:", options: ["Only one component", "Ash, moisture, extractive values and fiber", "Only color", "Only smell"], correct: 1 },
    { question: "Heavy metal adulteration can be detected by:", options: ["Simple observation", "Atomic absorption spectroscopy", "Taste test", "Smell test"], correct: 1 },
    { question: "Pesticide residue in herbal drugs is analyzed by:", options: ["Only taste", "GC and LC-MS", "Visual inspection", "Weighing"], correct: 1 },
    { question: "Mycotoxin contamination is tested by:", options: ["Only smell", "Chromatographic methods", "Color test", "Taste test"], correct: 1 },
    { question: "Aflatoxins are produced by:", options: ["Bacteria only", "Fungi", "Viruses", "Algae"], correct: 1 },
    { question: "The presence of micro-organisms indicates:", options: ["Good quality", "Contamination", "Proper storage", "Purity"], correct: 1 },
    { question: "Chemical adulteration includes adding:", options: ["Similar plant material", "Synthetic colors and flavors", "Other plant parts", "Soil"], correct: 1 },
    { question: "Sophisticated adulteration is:", options: ["Easy to detect", "Difficult to detect and intentional", "Accidental only", "Natural"], correct: 1 },
    { question: "Adulteration affects:", options: ["Only appearance", "Safety, efficacy and therapeutic outcome", "Only price", "Only packaging"], correct: 1 },
    { question: "Regulatory measures against adulteration include:", options: ["No punishment", "Fines, imprisonment and product recall", "Only warnings", "No action"], correct: 1 },
    { question: "Consumers can help prevent adulteration by:", options: ["Buying cheapest products", "Purchasing from reputable sources", "Ignoring packaging", "Not asking questions"], correct: 1 },
    { question: "Pharmacopoeial standards specify:", options: ["No limits", "Limits for adulterants and contaminants", "Only color standards", "Only price limits"], correct: 1 },
    { question: "Quality assurance helps prevent:", options: ["All adulteration", "Most adulteration through testing", "No adulteration", "Increasing adulteration"], correct: 1 },
    { question: "Proper documentation helps in:", options: ["Hiding adulteration", "Tracing and preventing adulteration", "Avoiding testing", "Reducing quality"], correct: 1 },
    { question: "Supply chain management can reduce adulteration by:", options: ["Ignoring suppliers", "Ensuring traceability and quality checks", "Using middlemen only", "Avoiding checks"], correct: 1 },
    { question: "Testing of raw materials helps ensure:", options: ["Lower cost", "Identity, purity and quality", "Faster production", "Larger quantity"], correct: 1 },
    { question: "Market surveillance for adulterated products is conducted by:", options: ["No one", "Regulatory authorities", "Only manufacturers", "Only patients"], correct: 1 },
    { question: "WHO guidelines on adulteration provide:", options: ["No framework", "International standards and testing methods", "Only local rules", "Marketing guidelines"], correct: 1 },
    { question: "The penalty for adulteration in most countries is:", options: ["No penalty", "Criminal prosecution and fines", "Only warning", "Product promotion"], correct: 1 },
    { question: "To prevent unintentional adulteration, proper:", options: ["Packaging only", "Storage and handling procedures are needed", "Pricing only", "Marketing only"], correct: 1 },
    { question: "Training of personnel helps reduce:", options: ["Innovation", "Accidental adulteration and contamination", "Testing", "Research"], correct: 1 },
    { question: "The best approach to combat adulteration is:", options: ["Ignore it", "Comprehensive quality management systems", "Lower prices", "Use more middlemen"], correct: 1 },
  ],
  ch11: Array.from({ length: 50 }, (_, i) => {
    const q = [
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
      { question: "Refractive index is measured by:", options: ["Refractometer", "Balance", "Microscope", "Spectroscope"], correct: 0 },
      { question: "Optical rotation is measured by:", options: ["Polarimeter", "Refractometer", "Microscope", "Balance"], correct: 0 },
      { question: "Melting point is determined by:", options: ["Visual observation", "Melting point apparatus", "Refractometer", "Polarimeter"], correct: 1 },
      { question: "Solubility tests are performed in:", options: ["Only water", "Various solvents as per pharmacopoeia", "Only alcohol", "Only ether"], correct: 1 },
      { question: "Powder microscopy is used to identify:", options: ["Chemical composition", "Microscopic characteristics", "Genetic makeup", "Molecular weight"], correct: 1 },
      { question: "Foreign organic matter in drugs includes:", options: ["Only the drug plant", "Other plant parts, insects and debris", "Only minerals", "Only water"], correct: 1 },
      { question: "The success of adulteration detection depends on:", options: ["Single test only", "Combination of various evaluation methods", "Price of drug", "Packaging"], correct: 1 },
      { question: "Vitreous silica is used as filtering medium in:", options: ["Distillation", "Filtration", "Extraction", "Crystallization"], correct: 1 },
      { question: "Purity criteria for drugs include:", options: ["Only one test", "Multiple tests for different impurities", "Only visual inspection", "Only pricing"], correct: 1 },
      { question: "Heavy metal analysis is done by:", options: ["Simple filtration", "Atomic absorption spectroscopy", "Visual inspection", "Taste testing"], correct: 1 },
      { question: "Sulfur dioxide content is determined by:", options: ["Only smell", "Titration methods", "Visual inspection", "Weighing"], correct: 1 },
      { question: "Pesticide residue analysis requires:", options: ["Simple filtration", "Sensitive chromatographic techniques", "Only visual check", "Taste test"], correct: 1 },
      { question: "Microbial limit tests check for:", options: ["Only bacteria", "Bacteria, fungi and specified pathogens", "Only viruses", "Only parasites"], correct: 1 },
      { question: "The shelf life of crude drugs depends on:", options: ["Only price", "Storage conditions and moisture content", "Only color", "Only packaging"], correct: 1 },
      { question: "Standardization ensures:", options: ["Lower cost", "Consistent quality and therapeutic effect", "Faster production", "Larger quantity"], correct: 1 },
      { question: "Marker compounds are used for:", options: ["Only identification", "Standardization and quality control", "Only pricing", "Only packaging"], correct: 1 },
      { question: "Fingerprint analysis using HPLC helps in:", options: ["Identifying single compound", "Comprehensive quality assessment", "Only pricing", "Only packaging"], correct: 1 },
      { question: "DNA barcoding can identify:", options: ["Only color", "Plant species authenticity", "Only size", "Only shape"], correct: 1 },
      { question: "Chemotaxonomy uses:", options: ["Only morphology", "Chemical constituents for classification", "Only geography", "Only price"], correct: 1 },
      { question: "Thin layer chromatography uses:", options: ["Only one solvent", "Multiple solvent systems", "Only water", "Only acids"], correct: 1 },
      { question: "Detection in TLC uses:", options: ["Only visual", "Various spraying reagents", "Only UV", "Only heat"], correct: 1 },
      { question: "Column chromatography is used for:", options: ["Only qualitative analysis", "Isolation and purification", "Only pricing", "Only packaging"], correct: 1 },
      { question: "Gas chromatography is suitable for:", options: ["Non-volatile compounds only", "Volatile compounds", "Only solids", "Only liquids"], correct: 1 },
      { question: "Mass spectrometry provides:", options: ["Only color info", "Molecular weight and structural information", "Only taste", "Only smell"], correct: 1 },
      { question: "NMR spectroscopy gives:", options: ["Only weight", "Structural elucidation information", "Only color", "Only density"], correct: 1 },
      { question: "UV spectroscopy is used for:", options: ["Only identification", "Qualitative and quantitative analysis", "Only pricing", "Only packaging"], correct: 1 },
      { question: "IR spectroscopy is used to identify:", options: ["Only color", "Functional groups", "Only molecular weight", "Only price"], correct: 1 },
      { question: "X-ray diffraction is used for:", options: ["Only color", "Crystalline structure determination", "Only taste", "Only smell"], correct: 1 },
      { question: "Thermal analysis includes:", options: ["Only weighing", "DTA and TGA", "Only color measurement", "Only pH measurement"], correct: 1 },
      { question: "Isotope ratio analysis can detect:", options: ["Only price", "Geographic origin", "Only color", "Only packaging"], correct: 1 },
      { question: "Multivariate analysis in quality control uses:", options: ["Single parameter", "Multiple parameters and statistical methods", "Only visual inspection", "Only pricing"], correct: 1 },
      { question: "Quality by Design (QbD) approach ensures:", options: ["Random testing", "Systematic and science-based quality", "Only final testing", "No testing"], correct: 1 },
      { question: "Process Analytical Technology (PAT) monitors:", options: ["Only final product", "Manufacturing process in real-time", "Only pricing", "Only packaging"], correct: 1 },
      { question: "Stability testing determines:", options: ["Only price", "Shelf life and storage conditions", "Only color", "Only packaging"], correct: 1 },
      { question: "Dissolution testing is important for:", options: ["Only appearance", "Drug availability and efficacy", "Only pricing", "Only color"], correct: 1 },
      { question: "Content uniformity ensures:", options: ["Only appearance", "Consistent drug dose in each unit", "Only packaging", "Only pricing"], correct: 1 },
      { question: "Bloom strength is measured for:", options: ["Only powders", "Gelatin", "Only liquids", "Only gases"], correct: 1 },
      { question: "Viscosity is measured using:", options: ["Only thermometer", "Viscometer", "Only balance", "Only ruler"], correct: 1 },
    ];
    return q[i % q.length];
  }),
  ch12: Array.from({ length: 50 }, (_, i) => {
    const q = [
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
      { question: "Acute toxicity testing studies:", options: ["Long-term effects", "Short-term toxic effects", "Genetic effects", "Environmental effects"], correct: 1 },
      { question: "Chronic toxicity testing studies:", options: ["Short-term effects", "Long-term effects", "Genetic effects only", "Environmental effects only"], correct: 1 },
      { question: "Genotoxicity testing checks for:", options: ["Acute toxicity", "DNA damage", "Only color changes", "Only weight changes"], correct: 1 },
      { question: "Mutagenicity testing detects:", options: ["Cancer only", "Gene mutations", "Only color changes", "Only taste changes"], correct: 1 },
      { question: "Carcinogenicity testing evaluates:", options: ["Short-term effects", "Tumor-causing potential", "Only color", "Only packaging"], correct: 1 },
      { question: "Brine shrimp lethality test is a:", options: ["Clinical test", "General toxicology screening", "Genetic test", "Pricing test"], correct: 1 },
      { question: "Anticancer screening uses:", options: ["Normal cells only", "Cancer cell lines", "Only bacteria", "Only fungi"], correct: 1 },
      { question: "Enzyme inhibition assays measure:", options: ["Cell growth", "Enzyme activity inhibition", "Only color", "Only taste"], correct: 1 },
      { question: "ACE inhibition assay is used for:", options: ["Antibacterial testing", "Antihypertensive screening", "Anticancer screening", "Antiviral screening"], correct: 1 },
      { question: "Alpha-glucosidase inhibition assay screens for:", options: ["Anticancer activity", "Antidiabetic activity", "Antibacterial activity", "Antiviral activity"], correct: 1 },
      { question: "Anti-inflammatory testing uses:", options: ["Only bacteria", "Animal models or cell lines", "Only fungi", "Only viruses"], correct: 1 },
      { question: "Wound healing assay evaluates:", options: ["Drug color", "Cell migration and proliferation", "Only pricing", "Only packaging"], correct: 1 },
      { question: "Antidiabetic screening includes:", options: ["Only anticancer tests", "Alpha-glucosidase and alpha-amylase inhibition", "Only antibacterial", "Only antiviral"], correct: 1 },
      { question: "Neuroprotective activity is tested using:", options: ["Only bacteria", "Neuronal cell lines or animal models", "Only fungi", "Only parasites"], correct: 1 },
      { question: "Hepatoprotective screening uses:", options: ["Only bacteria", "Liver cell models", "Only viruses", "Only parasites"], correct: 1 },
      { question: "Nephroprotective testing evaluates:", options: ["Only anticancer", "Kidney cell models", "Only antibacterial", "Only antifungal"], correct: 1 },
      { question: "Cardioprotective activity is assessed using:", options: ["Only bacteria", "Cardiac cell models", "Only fungi", "Only parasites"], correct: 1 },
      { question: "Antiviral screening tests:", options: ["Only antibacterial", "Virus replication inhibition", "Only anticancer", "Only antiparasitic"], correct: 1 },
      { question: "Immunomodulatory testing evaluates:", options: ["Only antibacterial", "Immune response modulation", "Only anticancer", "Only antifungal"], correct: 1 },
      { question: "Anti-aging research uses:", options: ["Only bacteria", "Senescence models", "Only viruses", "Only parasites"], correct: 1 },
      { question: "Obesity screening tests:", options: ["Only antibacterial", "Lipid accumulation and metabolism", "Only anticancer", "Only antiviral"], correct: 1 },
      { question: "Osteoprotective screening evaluates:", options: ["Only antibacterial", "Bone formation and resorption", "Only antifungal", "Only antiparasitic"], correct: 1 },
      { question: "Gastroprotective testing uses:", options: ["Only bacteria", "Gastric ulcer models", "Only viruses", "Only parasites"], correct: 1 },
      { question: "Antidepressant screening includes:", options: ["Only antibacterial", "Behavioral tests in animals", "Only anticancer", "Only antifungal"], correct: 1 },
      { question: "Analgesic testing evaluates:", options: ["Only color", "Pain response in animals", "Only pricing", "Only packaging"], correct: 1 },
      { question: "Antipyretic testing measures:", options: ["Only weight", "Body temperature reduction", "Only color", "Only taste"], correct: 1 },
      { question: "Diuretic activity is measured by:", options: ["Only color", "Urine volume measurement", "Only pricing", "Only packaging"], correct: 1 },
      { question: "Spasmolytic testing evaluates:", options: ["Only antibacterial", "Smooth muscle relaxation", "Only anticancer", "Only antifungal"], correct: 1 },
      { question: "Vasodilatory activity is tested using:", options: ["Only bacteria", "Vascular tissue preparations", "Only viruses", "Only parasites"], correct: 1 },
      { question: "Antiulcer activity screening uses:", options: ["Only antibacterial", "Gastric lesion models", "Only anticancer", "Only antiviral"], correct: 1 },
      { question: "Antifertility testing evaluates:", options: ["Only antibacterial", "Reproductive system effects", "Only anticancer", "Only antifungal"], correct: 1 },
      { question: "Antimalarial screening tests:", options: ["Only antibacterial", "Plasmodium parasite inhibition", "Only anticancer", "Only antiviral"], correct: 1 },
      { question: "Antitubercular screening uses:", options: ["Only cancer cells", "Mycobacterium tuberculosis", "Only fungi", "Only viruses"], correct: 1 },
      { question: "Anti-HIV screening evaluates:", options: ["Only antibacterial", "HIV replication inhibition", "Only anticancer", "Only antifungal"], correct: 1 },
      { question: "High-throughput screening processes:", options: ["One compound at a time", "Thousands of compounds simultaneously", "Only pricing", "Only packaging"], correct: 1 },
      { question: "Bioassay-guided fractionation helps to:", options: ["Only identify colors", "Isolate active compounds", "Only price drugs", "Only package drugs"], correct: 1 },
    ];
    return q[i % q.length];
  }),
  ch14: Array.from({ length: 50 }, (_, i) => {
    const q = [
      { question: "Carbohydrates are:", options: ["Proteins", "Polyhydroxy aldehydes or ketones", "Lipids", "Vitamins"], correct: 1 },
      { question: "Starch is a:", options: ["Monosaccharide", "Disaccharide", "Polysaccharide", "Oligosaccharide"], correct: 2 },
      { question: "Cellulose is a:", options: ["Storage polysaccharide", "Structural polysaccharide", "Simple sugar", "Protein"], correct: 1 },
      { question: "Agar is obtained from:", options: ["Plants", "Seaweeds", "Fungi", "Animals"], correct: 1 },
      { question: "Gum arabic is obtained from:", options: ["Seaweed", "Acacia tree", "Fungi", "Animal bones"], correct: 1 },
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
      { question: "Amylose is a component of:", options: ["Protein", "Starch", "Lipid", "Vitamin"], correct: 1 },
      { question: "Amylopectin is a component of:", options: ["Protein", "Starch", "Lipid", "Vitamin"], correct: 1 },
      { question: "Cellulose is composed of:", options: ["Fructose units", "Glucose units", "Sucrose units", "Maltose units"], correct: 1 },
      { question: "Chitin is found in:", options: ["Plants", "Fungi and crustaceans", "Bacteria only", "Animals only"], correct: 1 },
      { question: "Glycogen is stored in:", options: ["Only plants", "Liver and muscles", "Only fungi", "Only bacteria"], correct: 1 },
      { question: "Sucrose is a:", options: ["Monosaccharide", "Disaccharide", "Polysaccharide", "Oligosaccharide"], correct: 1 },
      { question: "Lactose is found in:", options: ["Plants", "Milk", "Fungi", "Bacteria"], correct: 1 },
      { question: "Maltose is produced from:", options: ["Protein breakdown", "Starch breakdown", "Lipid breakdown", "Vitamin synthesis"], correct: 1 },
      { question: "Trehalose is found in:", options: ["Only plants", "Fungi and insects", "Only bacteria", "Only animals"], correct: 1 },
      { question: "Mannitol is a:", options: ["Sugar alcohol", "Protein", "Lipid", "Vitamin"], correct: 0 },
      { question: "Sorbitol is used as:", options: ["Only sweetener", "Sweetener and humectant", "Only preservative", "Only color"], correct: 1 },
      { question: "Xylitol is a sugar alcohol derived from:", options: ["Only fruits", "Xylose", "Only vegetables", "Only grains"], correct: 1 },
      { question: "Honey mainly contains:", options: ["Only fructose", "Glucose and fructose", "Only sucrose", "Only maltose"], correct: 1 },
      { question: "Gum tragacanth is obtained from:", options: ["Seaweed", "Astragalus species", "Fungi", "Bacteria"], correct: 1 },
      { question: "Karaya gum is obtained from:", options: ["Seaweed", "Sterculia species", "Fungi", "Bacteria"], correct: 1 },
      { question: "Locust bean gum is derived from:", options: ["Seaweed", "Carob seeds", "Fungi", "Bacteria"], correct: 1 },
      { question: "Xanthan gum is produced by:", options: ["Plants", "Bacterial fermentation", "Fungi", "Algae"], correct: 1 },
      { question: "Gellan gum is produced by:", options: ["Plants", "Sphingomonas elodea", "Fungi", "Yeast"], correct: 1 },
      { question: "Pullulan is produced by:", options: ["Plants", "Aureobasidium pullulans", "Fungi", "Bacteria"], correct: 1 },
      { question: "Chitosan is derived from:", options: ["Starch", "Chitin", "Protein", "Lipid"], correct: 1 },
      { question: "Cyclodextrins are used for:", options: ["Only sweetness", "Drug delivery", "Only preservation", "Only coloring"], correct: 1 },
      { question: "Methylcellulose is used as:", options: ["Only sweetener", "Thickener and emulsifier", "Only preservative", "Only color"], correct: 1 },
      { question: "Hydroxypropyl methylcellulose (HPMC) is used in:", options: ["Only food", "Pharmaceutical formulations", "Only cosmetics", "Only textiles"], correct: 1 },
      { question: "Microcrystalline cellulose is used as:", options: ["Only sweetener", "Tablet binder and disintegrant", "Only preservative", "Only color"], correct: 1 },
      { question: "Dibasic calcium phosphate is used as:", options: ["Sweetener", "Tablet diluent", "Preservative", "Coloring agent"], correct: 1 },
      { question: "Mannitol is used in tablets as:", options: ["Only sweetener", "Diluent and sweetener", "Only binder", "Only preservative"], correct: 1 },
      { question: "Sorbitol is used in tablets as:", options: ["Only sweetener", "Diluent and sweetener", "Only binder", "Only preservative"], correct: 1 },
      { question: "Lactose is commonly used as:", options: ["Only sweetener", "Tablet diluent", "Only binder", "Only preservative"], correct: 1 },
      { question: "Trehalose is used in:", options: ["Only food", "Pharmaceuticals and food as stabilizer", "Only cosmetics", "Only packaging"], correct: 1 },
      { question: "Sucralose is a:", options: ["Natural sweetener", "Artificial sweetener", "Sugar alcohol", "Protein"], correct: 1 },
      { question: "Aspartame is:", options: ["Natural sugar", "Artificial sweetener", "Sugar alcohol", "Natural extract"], correct: 1 },
      { question: "Stevia is a:", options: ["Artificial sweetener", "Natural sweetener from plant", "Sugar alcohol", "Synthetic compound"], correct: 1 },
      { question: "Monosodium glutamate is:", options: ["Only preservative", "Flavor enhancer", "Only sweetener", "Only color"], correct: 1 },
      { question: "Carrageenan types include:", options: ["Only one type", "Kappa, Iota and Lambda", "Only two types", "Only three types"], correct: 1 },
      { question: "Alginate beads are used for:", options: ["Only sweetness", "Drug delivery systems", "Only preservation", "Only coloring"], correct: 1 },
      { question: "Starch granules show:", options: ["No birefringence", "Birefringence under polarized light", "Only fluorescence", "No characteristic pattern"], correct: 1 },
    ];
    return q[i % q.length];
  }),
  ch15: Array.from({ length: 50 }, (_, i) => {
    const q = [
      { question: "Alkaloids contain:", options: ["Oxygen only", "Nitrogen in heterocyclic ring", "Sulfur only", "Phosphorus only"], correct: 1 },
      { question: "Morphine is obtained from:", options: ["Cinchona bark", "Opium poppy", "Ephedra plant", "Coca plant"], correct: 1 },
      { question: "Quinine is used for:", options: ["Pain relief", "Malaria treatment", "Heart conditions", "Diabetes"], correct: 1 },
      { question: "Caffeine is found in:", options: ["Only coffee", "Coffee, tea and cocoa", "Only tea", "Only cocoa"], correct: 1 },
      { question: "Atropine is obtained from:", options: ["Digitalis", "Belladonna", "Cinchona", "Ephedra"], correct: 1 },
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
      { question: "Berberine is found in:", options: ["Opium poppy", "Berberis species", "Cinchona", "Ephedra"], correct: 1 },
      { question: "Ergotamine is obtained from:", options: ["Plant sources", "Fungus Claviceps", "Animal sources", "Synthetic"], correct: 1 },
      { question: "Vinblastine is used for:", options: ["Malaria", "Cancer chemotherapy", "Pain relief", "Heart disease"], correct: 1 },
      { question: "Taxol (paclitaxel) is obtained from:", options: ["Synthetic", "Pacific yew tree", "Opium poppy", "Cinchona bark"], correct: 1 },
      { question: "Camptothecin is found in:", options: ["Only animals", "Chinese happy tree", "Only fungi", "Only bacteria"], correct: 1 },
      { question: "Podophyllotoxin is obtained from:", options: ["Opium", "Podophyllum species", "Cinchona", "Ephedra"], correct: 1 },
      { question: "Hyoscine is another name for:", options: ["Atropine", "Scopolamine", "Hyoscyamine", "Ephedrine"], correct: 1 },
      { question: "Hyoscyamine is found in:", options: ["Belladonna", "Opium poppy", "Cinchona", "Ephedra"], correct: 0 },
      { question: "Papaverine is found in:", options: ["Cinchona", "Opium poppy", "Ephedra", "Belladonna"], correct: 1 },
      { question: "Codeine is used as:", options: ["Only antitussive", "Analgesic and antitussive", "Only stimulant", "Only sedative"], correct: 1 },
      { question: "Noscapine is obtained from:", options: ["Synthetic", "Opium poppy", "Belladonna", "Ephedra"], correct: 1 },
      { question: "Papaverine is used for:", options: ["Pain relief", "Vasodilation", "Malaria", "Infection"], correct: 1 },
      { question: "Emetine is obtained from:", options: ["Ipecacuanha", "Opium", "Belladonna", "Cinchona"], correct: 0 },
      { question: "Tubocurarine is obtained from:", options: ["Plants only", "Chondrodendron species", "Synthetic", "Fungi"], correct: 1 },
      { question: "Physostigmine is obtained from:", options: ["Belladonna", "Calabar bean", "Opium", "Cinchona"], correct: 1 },
      { question: "Pilocarpine is obtained from:", options: ["Opium poppy", "Pilocarpus species", "Belladonna", "Ephedra"], correct: 1 },
      { question: "Cinchona bark contains:", options: ["Only quinine", "Quinine, quinidine and cinchonine", "Only caffeine", "Only morphine"], correct: 1 },
      { question: "Solanaceous alkaloids include:", options: ["Atropine, hyoscine and hyoscyamine", "Morphine and codeine", "Quinine and quinidine", "Ephedrine and pseudoephedrine"], correct: 0 },
      { question: "Rauwolfia serpentina contains:", options: ["Only one alkaloid", "Reserpine and related alkaloids", "Only caffeine", "Only morphine"], correct: 1 },
      { question: "Reserpine is used for:", options: ["Pain relief", "Hypertension and tranquilizer", "Malaria", "Infection"], correct: 1 },
      { question: "Ajmalicine is found in:", options: ["Rauwolfia", "Opium poppy", "Cinchona", "Ephedra"], correct: 0 },
      { question: "Yohimbine is obtained from:", options: ["Rauwolfia", "Pausinystalia yohimbe", "Belladonna", "Ephedra"], correct: 1 },
      { question: "Vincristine is used for:", options: ["Malaria", "Cancer chemotherapy", "Hypertension", "Diabetes"], correct: 1 },
      { question: "Colchicine is obtained from:", options: ["Synthetic", "Autumn crocus", "Opium poppy", "Belladonna"], correct: 1 },
      { question: "Tubocurarine is used as:", options: ["Only stimulant", "Muscle relaxant in anesthesia", "Only analgesic", "Only antitussive"], correct: 1 },
      { question: "Alkaloid extraction uses:", options: ["Only water", "Acid and base extraction", "Only organic solvents", "Only heat"], correct: 1 },
      { question: "Alkaloid purification uses:", options: ["Only crystallization", "Crystallization and chromatography", "Only filtration", "Only distillation"], correct: 1 },
      { question: "Amberlite resin is used for:", options: ["Only color removal", "Ion exchange chromatography", "Only filtration", "Only extraction"], correct: 1 },
      { question: "Alkaloid salts are usually:", options: ["Insoluble in water", "Water soluble", "Volatile", "Unstable"], correct: 1 },
      { question: "Ergot alkaloids are used for:", options: ["Pain relief", "Migraine and postpartum hemorrhage", "Malaria", "Infection"], correct: 1 },
      { question: "Lisofylline is a:", options: ["Natural alkaloid", "Semi-synthetic derivative", "Synthetic compound", "Plant extract"], correct: 1 },
      { question: "Alkaloid content in plants varies with:", options: ["Only plant age", "Plant part, age, season and location", "Only season", "Only location"], correct: 1 },
      { question: "Pyridine alkaloids include:", options: ["Atropine", "Nicotine and coniine", "Morphine", "Quinine"], correct: 1 },
      { question: "Quinazoline alkaloids are found in:", options: ["Opium", "Rauwolfia", "Vasaka", "Ephedra"], correct: 2 },
      { question: "Imidazole alkaloids include:", options: ["Nicotine", "Pilocarpine", "Ephedrine", "Atropine"], correct: 1 },
    ];
    return q[i % q.length];
  }),
};

const getQuestionsForChapter = (chapterId: string): { question: string; options: string[]; correct: number }[] => {
  let chapterQuestions = quizData[chapterId] || [];
  if (chapterQuestions.length === 0) {
    chapterQuestions = quizData["ch15"] || [];
  }
  if (chapterQuestions.length === 0) {
    return [{ question: "Coming soon - questions under development", options: ["A", "B", "C", "D"], correct: 0 }];
  }
  if (chapterQuestions.length >= 50) return chapterQuestions.slice(0, 50);
  
  const allQuestions = [...chapterQuestions];
  while (allQuestions.length < 50) {
    const baseIndex = allQuestions.length % chapterQuestions.length;
    const baseQuestion = chapterQuestions[baseIndex];
    allQuestions.push({ ...baseQuestion });
  }
  return allQuestions.slice(0, 50);
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

  const questions = currentChapter ? getQuestionsForChapter(currentChapter.id) : [];
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
