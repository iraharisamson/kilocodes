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

const generateQuestions = (chapterId: string): { id: number; question: string; options: string[]; correct: number }[] => {
  const questionTemplates: Record<string, string[]> = {
    ch1: [
      "Who is known as the father of modern Pharmacognosy?", "What does pharmacognosy study?", "Which ancient civilization first used herbal medicines?",
      "What is the scope of pharmacognosy?", "When did the term pharmacognosy first appear?", "Who wrote the book 'De Materia Medica'?",
      "What are the main sources of natural drugs?", "What is crude drug?", "Define pharmacognosy.", "What is the historical significance of herbal medicine?",
      "Which Greek physician known as father of medicine?", "What role did Egypt play in pharmacognosy?", "What is ethnobotany?", "What is ethnopharmacology?",
      "What are the traditional systems of medicine?", "What is Ayurveda?", "What is Unani system?", "What is Chinese medicine?",
      "What is the difference between pharmacognosy and pharmacology?", "What is natural product chemistry?",
      "What are secondary metabolites?", "What are primary metabolites?", "What is the importance of pharmacognosy in pharmacy?",
      "What is drug discovery from natural sources?", "What is traditional medicine?", "What is the role of WHO in traditional medicine?",
      "What are the limitations of herbal medicine?", "What is standardization in pharmacognosy?", "What is the future of pharmacognosy?",
      "What is phytotherapy?", "What is herbal medicine?", "What is the difference between herbal and conventional medicine?",
      "What are the safety concerns with herbal drugs?", "What is pharmacovigilance?", "What is the regulatory framework for herbal medicines?",
      "What is GMP for herbal medicines?", "What are the quality parameters for crude drugs?", "What is macroscopic examination?",
      "What is microscopic examination?", "What are the sources of variability in herbal drugs?", "What is the importance of plant collection?",
      "What is post-harvest processing?", "What is drug storage?", "What is the effect of storage on drug quality?",
      "What are the factors affecting drug quality?", "What is the role of climate in medicinal plant cultivation?",
    ],
    ch2: [
      "What is Ayurveda?", "What are the three doshas in Ayurveda?", "What is the goal of Ayurveda?", "What is Unani medicine?",
      "Who founded the Unani system?", "What are the four humors in Unani?", "What is the principle of Unani medicine?",
      "What is Traditional Chinese Medicine?", "What are the main modalities in TCM?", "What is acupuncture?",
      "What is the concept of Yin and Yang?", "What are meridians in TCM?", "What is herbal medicine?",
      "What is Naturopathy?", "What are the principles of Naturopathy?", "What is Homeopathy?",
      "Who founded Homeopathy?", "What is the principle of 'like cures like'?", "What are the limitations of alternative medicine?",
      "What is the difference between traditional and modern medicine?", "What is integrative medicine?",
      "What is the role of WHO in traditional medicine?", "What are the safety concerns with alternative medicine?",
      "What is evidence-based traditional medicine?", "What is the future of alternative medicine?",
      "What are the advantages of herbal medicine?", "What are the disadvantages of herbal medicine?",
      "What is the regulatory status of traditional medicine?", "What is Ayurveda Pharmacopoeia?",
      "What is the role of traditional medicine in primary healthcare?", "What is the difference between Ayurveda and Unani?",
      "What is the importance of traditional knowledge?", "What is the protection of traditional knowledge?",
      "What is biopiracy?", "What is traditional cultural expressions?", "What is the role of NGOs in traditional medicine?",
      "What is the economic value of traditional medicine?", "What is the global market for herbal medicine?",
      "What is the difference between complementary and alternative medicine?", "What is aromatherapy?",
      "What is herbalism?", "What is the role of diet in traditional medicine?", "What is the importance of meditation in TCM?",
      "What is the role of yoga in health?", "What is the principle of detoxification in Ayurveda?", "What is Panchakarma?",
      "What are the quality standards for Ayurvedic medicines?", "What is the role of pharmacognosy in Ayurveda?",
    ],
    ch3: [
      "What are the main classifications of natural drugs?", "What is morphological classification?", "What is taxonomical classification?",
      "What is chemical classification?", "What is pharmacological classification?", "What is alphabetical classification?",
      "What is therapeutic classification?", "What are alkaloids?", "What are glycosides?",
      "What are volatile oils?", "What are resins?", "What are tannins?",
      "What are carbohydrates?", "What are lipids?", "What are proteins?",
      "What is the chemical classification based on?", "What is the morphological classification based on?", "What is the taxonomical classification based on?",
      "What are the advantages of chemical classification?", "What are the disadvantages of chemical classification?",
      "What is the botanical classification of drugs?", "What is the animal classification of drugs?",
      "What is the mineral classification of drugs?", "What are the major groups of natural products?",
      "What are terpenoids?", "What are flavonoids?", "What are phenolic compounds?",
      "What are steroids?", "What are antibiotics?", "What are vitamins?",
      "What are enzymes?", "What are alkaloids classification?", "What are indole alkaloids?",
      "What are isoquinoline alkaloids?", "What are tropane alkaloids?", "What are purine alkaloids?",
      "What are cardiac glycosides?", "What are saponin glycosides?", "What are flavonoid glycosides?",
      "What are anthraquinone glycosides?", "What are cyanogenic glycosides?", "What are thioglycosides?",
      "What are phenolic glycosides?", "What is the classification based on pharmacological action?",
      "What is the classification based on chemical nature?", "What is the alphabetical classification?",
      "What is the importance of drug classification?", "What is the modern approach to drug classification?",
      "What is the traditional approach to drug classification?", "What is the combined classification system?",
    ],
    ch4: [
      "What is pharmaceutical botany?", "What is plant morphology?", "What is plant anatomy?",
      "What is the structure of a plant cell?", "What are plant tissues?", "What are meristematic tissues?",
      "What are permanent tissues?", "What is the epidermis?", "What is the cortex?",
      "What is the stele?", "What are vascular bundles?", "What is xylem?",
      "What is phloem?", "What are plant organs?", "What are the functions of roots?",
      "What are the functions of stems?", "What are the functions of leaves?", "What is photosynthesis?",
      "What are stomata?", "What are trichomes?", "What is plant taxonomy?",
      "What is the binomial nomenclature?", "What is the hierarchy of classification?", "What is the family of medicinal plants?",
      "What are the important medicinal plant families?", "What is the Lamiaceae family?", "What is the Asteraceae family?",
      "What is the Fabaceae family?", "What is the Solanaceae family?", "What is the Rosaceae family?",
      "What is plant physiology?", "What is plant metabolism?", "What are primary metabolites in plants?",
      "What are secondary metabolites?", "What is the function of secondary metabolites?", "What is plant growth regulators?",
      "What is plant propagation?", "What is sexual propagation?", "What is asexual propagation?",
      "What is grafting?", "What is cutting?", "What is tissue culture?",
      "What is the importance of botany in pharmacognosy?", "What are the microscopic characteristics of leaves?",
      "What are the microscopic characteristics of stems?", "What are the microscopic characteristics of roots?",
      "What is powder microscopy?", "What are the diagnostic features of powdered drugs?",
    ],
    ch10: [
      "What is drug adulteration?", "What are the types of adulteration?", "What is intentional adulteration?",
      "What is unintentional adulteration?", "What are the common adulterants?", "What is substitution?",
      "What is addition of adulterants?", "What is subtraction?", "What is contamination?",
      "What are the reasons for adulteration?", "What are the methods of detection?", "What is microscopic examination?",
      "What is chemical analysis?", "What is chromatographic methods?", "What is TLC?",
      "What is HPLC?", "What is GC?", "What is spectroscopy?",
      "What is UV-visible spectroscopy?", "What is IR spectroscopy?", "What is mass spectrometry?",
      "What are the肉眼 characteristics of adulteration?", "What is the effect of adulteration on health?",
      "What are the legal implications of adulteration?", "What is the WHO guidelines on adulteration?",
      "What is the pharmacopoeial standards for drugs?", "What is the IP monograph?", "What is the BP monograph?",
      "What is USP monograph?", "What is the importance of standardization?", "What is the role of QC in detecting adulteration?",
      "What are the common adulterants in herbal drugs?", "What is adulteration with synthetic drugs?",
      "What is adulteration with other plant materials?", "What is adulteration with mineral substances?",
      "What is adulteration with heavy metals?", "What is adulteration with microbes?", "What is deterioration?",
      "What is spoilage?", "What is the difference between adulteration and contamination?", "What is the prevention of adulteration?",
      "What is the role of government in preventing adulteration?", "What is the role of industry in preventing adulteration?",
      "What is the role of consumers in preventing adulteration?", "What is drug licensing?", "What is GMP?",
      "What is the penalty for adulteration?", "What is the testing protocols for detection?",
    ],
    ch11: [
      "What is evaluation of crude drugs?", "What is macroscopic evaluation?", "What is microscopic evaluation?",
      "What is chemical evaluation?", "What is biological evaluation?", "What is physical evaluation?",
      "What are the organoleptic characters?", "What is the shape, size and color evaluation?", "What is the odor and taste evaluation?",
      "What is the fracture and texture evaluation?", "What is the ash value?", "What is total ash?",
      "What is acid-insoluble ash?", "What is water-soluble ash?", "What is the extractive value?",
      "What is alcohol-soluble extractive?", "What is water-soluble extractive?", "What is ether-soluble extractive?",
      "What is moisture content?", "What is loss on drying?", "What is water content by Karl Fischer?",
      "What is the swelling index?", "What is the foaming index?", "What is the viscosity?",
      "What is the specific gravity?", "What is the refractive index?", "What is the optical rotation?",
      "What is chromatography?", "What is paper chromatography?", "What is thin layer chromatography?",
      "What is column chromatography?", "What is gas chromatography?", "What is HPLC?",
      "What is the principle of TLC?", "What are the mobile and stationary phases?", "What is Rf value?",
      "What is the detection methods in TLC?", "What is the spraying reagents?", "What is the interpretation of TLC?",
      "What is electrophoresis?", "What is the capillary electrophoresis?", "What is the spectroscopy?",
      "What is UV spectroscopy?", "What is IR spectroscopy?", "What is NMR?",
      "What is mass spectrometry?", "What is the fingerprint analysis?", "What is marker compound analysis?",
      "What is the quantitative analysis?", "What is the validation of analytical methods?", "What is the LOD and LOQ?",
    ],
    ch12: [
      "What is biological screening?", "Why is biological screening important?", "What are the types of biological tests?",
      "What is in vitro screening?", "What is in vivo screening?", "What is cell line screening?",
      "What is enzyme inhibition assay?", "What is antimicrobial screening?", "What is antioxidant assay?",
      "What is anti-inflammatory assay?", "What is anticancer screening?", "What is cytotoxicity testing?",
      "What is the Brine Shrimp Lethality Test?", "What is the DPPH assay?", "What is the FRAP assay?",
      "What is the NO scavenging assay?", "What is the lipid peroxidation assay?", "What is the α-glucosidase inhibition assay?",
      "What is the ACE inhibition assay?", "What is the acetylcholinesterase inhibition assay?", "What is antimicrobial susceptibility test?",
      "What is the disc diffusion method?", "What is the well diffusion method?", "What is MIC determination?",
      "What is MBC determination?", "What is the cell viability assay?", "What is MTT assay?",
      "What is the WST assay?", "What is flow cytometry?", "What is the purpose of pilot screening?",
      "What is the hit identification?", "What is lead compound?", "What is the structure-activity relationship?",
      "What is the in silico screening?", "What is molecular docking?", "What is the QSAR?",
      "What is the animal models in screening?", "What is the ethical considerations in animal testing?", "What is the alternative methods to animal testing?",
      "What is the 3R principle?", "What is the tissue culture methods?", "What is the organotypic culture?",
      "What is the toxicology screening?", "What is acute toxicity testing?", "What is chronic toxicity testing?",
      "What is genotoxicity testing?", "What is mutagenicity testing?", "What is carcinogenicity testing?",
    ],
    ch14: [
      "What are carbohydrates?", "What are the sources of carbohydrate drugs?", "What is starch?",
      "What is the medicinal use of starch?", "What is cellulose?", "What is the use of cellulose in pharmacy?",
      "What is dextrin?", "What is inulin?", "What is the use of inulin?",
      "What is gum arabic?", "What are the uses of gum arabic?", "What is tragacanth?",
      "What is acacia?", "What is agar?", "What is the use of agar?",
      "What is pectin?", "What is the use of pectin?", "What is alginic acid?",
      "What is sodium alginate?", "What is the use of sodium alginate?", "What is carrageenan?",
      "What is the use of carrageenan?", "What is guar gum?", "What is xanthan gum?",
      "What is locust bean gum?", "What is the chemical composition of carbohydrates?", "What is monosaccharide?",
      "What is disaccharide?", "What is polysaccharide?", "What is the difference between simple and complex carbohydrates?",
      "What is the identification test for carbohydrates?", "What is Molisch test?", "What is Fehling test?",
      "What is Benedict test?", "What is the iodine test for starch?", "What is the hydrolysis of carbohydrates?",
      "What is the optical activity of carbohydrates?", "What is mutarotation?", "What is the reducing property of carbohydrates?",
      "What is the fermentation of sugars?", "What is the metabolic role of carbohydrates?", "What is the role of carbohydrates in drug formulations?",
      "What are the quality parameters for carbohydrate drugs?", "What is the ash content of carbohydrates?", "What is the moisture content of carbohydrates?",
    ],
    ch15: [
      "What are alkaloids?", "What is the general structure of alkaloids?", "What is the nitrogen in alkaloids?",
      "What are the sources of alkaloids?", "What is the classification of alkaloids?", "What are true alkaloids?",
      "What are protoalkaloids?", "What are pseudoalkaloids?", "What are indole alkaloids?",
      "What are isoquinoline alkaloids?", "What are tropane alkaloids?", "What are purine alkaloids?",
      "What are steroid alkaloids?", "What are quinoline alkaloids?", "What are imidazole alkaloids?",
      "What is morphine?", "What is the source of morphine?", "What are the uses of morphine?",
      "What is quinine?", "What is the source of quinine?", "What are the uses of quinine?",
      "What is caffeine?", "What is the source of caffeine?", "What are the uses of caffeine?",
      "What is nicotine?", "What is the source of nicotine?", "What are the uses of nicotine?",
      "What is cocaine?", "What is the source of cocaine?", "What are the uses of cocaine?",
      "What is atropine?", "What is the source of atropine?", "What are the uses of atropine?",
      "What is ephedrine?", "What is the source of ephedrine?", "What are the uses of ephedrine?",
      "What is the general test for alkaloids?", "What is Mayer test?", "What is Wagner test?",
      "What is Dragendorff test?", "What is the extraction of alkaloids?", "What is the purification of alkaloids?",
    ],
    ch16: [
      "What are glycosides?", "What is the structure of glycosides?", "What is the aglycone?",
      "What is the glycone?", "What is the glycosidic bond?", "What are the sources of glycosides?",
      "What is the classification of glycosides?", "What are cardiac glycosides?", "What are saponin glycosides?",
      "What are flavonoid glycosides?", "What are anthraquinone glycosides?", "What are cyanogenic glycosides?",
      "What are thioglycosides?", "What are phenolic glycosides?", "What are isoflavonoid glycosides?",
      "What is digoxin?", "What is the source of digoxin?", "What are the uses of digoxin?",
      "What is quinine?", "What is the source of quinine?", "What are the uses of quinine?",
      "What is sennoside?", "What is the source of sennosides?", "What are the uses of sennosides?",
      "What is glycyrrhizin?", "What is the source of glycyrrhizin?", "What are the uses of glycyrrhizin?",
      "What is amygdalin?", "What is the source of amygdalin?", "What are the uses of amygdalin?",
      "What is salicin?", "What is the source of salicin?", "What are the uses of salicin?",
      "What is the general test for glycosides?", "What is the hydrolysis of glycosides?", "What is the detection of sugars in glycosides?",
      "What is the extraction of glycosides?", "What is the purification of glycosides?", "What is the TLC of glycosides?",
      "What is the HPLC of glycosides?", "What is the role of glycosides in medicine?", "What are the toxic glycosides?",
    ],
    ch17: [
      "What are volatile oils?", "What is another name for volatile oils?", "What is the chemical composition of volatile oils?",
      "What are the sources of volatile oils?", "What is the classification of volatile oils?", "What are terpenoid volatile oils?",
      "What are aromatic volatile oils?", "What is the extraction of volatile oils?", "What is steam distillation?",
      "What is solvent extraction?", "What is supercritical fluid extraction?", "What is hydrodistillation?",
      "What is the use of volatile oils in medicine?", "What is the use of volatile oils in cosmetics?", "What is the use of volatile oils in food?",
      "What is menthol?", "What is the source of menthol?", "What are the uses of menthol?",
      "What is eucalyptol?", "What is the source of eucalyptol?", "What are the uses of eucalyptol?",
      "What is camphor?", "What is the source of camphor?", "What are the uses of camphor?",
      "What is thymol?", "What is the source of thymol?", "What are the uses of thymol?",
      "What is eugenol?", "What is the source of eugenol?", "What are the uses of eugenol?",
      "What is citral?", "What is the source of citral?", "What are the uses of citral?",
      "What is the test for volatile oils?", "What is the solubility of volatile oils?", "What is the specific gravity of volatile oils?",
      "What is the optical rotation of volatile oils?", "What is the refractive index of volatile oils?", "What is the storage of volatile oils?",
      "What is the adulteration of volatile oils?", "What is the role of volatile oils in aromatherapy?", "What are the safety concerns with volatile oils?",
    ],
    ch18: [
      "What are resins?", "What is the chemical composition of resins?", "What are the sources of resins?",
      "What is the classification of resins?", "What are natural resins?", "What are Balsams?",
      "What are oleoresins?", "What are gum resins?", "What are the uses of resins?",
      "What is turpentine?", "What is the source of turpentine?", "What are the uses of turpentine?",
      "What is rosin?", "What is the source of rosin?", "What are the uses of rosin?",
      "What is dammar?", "What is the source of dammar?", "What are the uses of dammar?",
      "What is shellac?", "What is the source of shellac?", "What are the uses of shellac?",
      "What is myrrh?", "What is the source of myrrh?", "What are the uses of myrrh?",
      "What is frankincense?", "What is the source of frankincense?", "What are the uses of frankincense?",
      "What is benzoin?", "What is the source of benzoin?", "What are the uses of benzoin?",
      "What is gum resin?", "What is the difference between gum and resin?", "What is the extraction of resins?",
      "What is the purification of resins?", "What is the identification of resins?", "What is the solubility of resins?",
      "What is the melting point of resins?", "What is the acid value of resins?", "What is the saponification value of resins?",
      "What is the use of resins in adhesives?", "What is the use of resins in varnishes?", "What is the use of resins in inks?",
    ],
    ch19: [
      "What are lipids?", "What is the chemical composition of lipids?", "What are the sources of lipids?",
      "What is the classification of lipids?", "What are simple lipids?", "What are compound lipids?",
      "What are derived lipids?", "What are fixed oils?", "What are fats?",
      "What is the difference between oils and fats?", "What are the uses of lipids in medicine?", "What are the uses of lipids in cosmetics?",
      "What is castor oil?", "What is the source of castor oil?", "What are the uses of castor oil?",
      "What is olive oil?", "What is the source of olive oil?", "What are the uses of olive oil?",
      "What is coconut oil?", "What is the source of coconut oil?", "What are the uses of coconut oil?",
      "What is linseed oil?", "What is the source of linseed oil?", "What are the uses of linseed oil?",
      "What is theobroma oil?", "What is the source of theobroma oil?", "What are the uses of theobroma oil?",
      "What is wool fat?", "What is the source of wool fat?", "What are the uses of wool fat?",
      "What is lanolin?", "What is the source of lanolin?", "What are the uses of lanolin?",
      "What is beeswax?", "What is the source of beeswax?", "What are the uses of beeswax?",
      "What is spermaceti?", "What is the source of spermaceti?", "What are the uses of spermaceti?",
      "What is the saponification value?", "What is the acid value?", "What is the iodine value?",
      "What is the peroxide value?", "What is the unsaponifiable matter?", "What is the fatty acid composition?",
    ],
    ch20: [
      "What are tannins?", "What is the chemical composition of tannins?", "What are the sources of tannins?",
      "What is the classification of tannins?", "What are hydrolyzable tannins?", "What are condensed tannins?",
      "What are the uses of tannins?", "What is the astringent property of tannins?", "What is the protein-binding property?",
      "What is tannic acid?", "What is the source of tannic acid?", "What are the uses of tannic acid?",
      "What is gallic acid?", "What is the source of gallic acid?", "What are the uses of gallic acid?",
      "What is pyrogallol?", "What is the source of pyrogallol?", "What are the uses of pyrogallol?",
      "What is catechu?", "What is the source of catechu?", "What are the uses of catechu?",
      "What is myrobalan?", "What is the source of myrobalan?", "What are the uses of myrobalan?",
      "What is gambier?", "What is the source of gambier?", "What are the uses of gambier?",
      "What is oak bark?", "What is the source of oak bark?", "What are the uses of oak bark?",
      "What is the test for tannins?", "What is the gelatin test?", "What is the ferric chloride test?",
      "What is the lead acetate test?", "What is the bromine water test?", "What is the hide powder test?",
      "What is the extraction of tannins?", "What is the purification of tannins?", "What is the role of tannins in leather industry?",
      "What is the role of tannins in medicine?", "What is the role of tannins in food?", "What are the toxic effects of tannins?",
    ],
    ch21: [
      "What are enzymes?", "What is the chemical nature of enzymes?", "What are the sources of enzymes?",
      "What is the classification of enzymes?", "What are oxidoreductases?", "What are transferases?",
      "What are hydrolases?", "What are lyases?", "What are isomerases?",
      "What are ligases?", "What are the medicinal uses of enzymes?", "What is bromelain?",
      "What is the source of bromelain?", "What are the uses of bromelain?", "What is papain?",
      "What is the source of papain?", "What are the uses of papain?", "What is pancreatin?",
      "What is the source of pancreatin?", "What are the uses of pancreatin?", "What is pepsin?",
      "What is the source of pepsin?", "What are the uses of pepsin?", "What is trypsin?",
      "What is the source of trypsin?", "What are the uses of trypsin?", "What is chymotrypsin?",
      "What is the source of chymotrypsin?", "What are the uses of chymotrypsin?", "What is streptokinase?",
      "What is the source of streptokinase?", "What are the uses of streptokinase?", "What is urokinase?",
      "What is the source of urokinase?", "What are the uses of urokinase?", "What is L-asparaginase?",
      "What is the source of L-asparaginase?", "What are the uses of L-asparaginase?", "What is the activity of enzymes?",
      "What is the unit of enzyme activity?", "What is the specific activity?", "What is the stability of enzymes?",
      "What is the storage of enzymes?", "What is the immobilization of enzymes?", "What are protein drugs?",
    ],
    ch22: [
      "What are fibers?", "What is the classification of fibers?", "What are vegetable fibers?",
      "What are animal fibers?", "What are mineral fibers?", "What are the uses of fibers in medicine?",
      "What is cotton?", "What is the source of cotton?", "What are the uses of cotton?",
      "What is linen?", "What is the source of linen?", "What are the uses of linen?",
      "What is jute?", "What is the source of jute?", "What are the uses of jute?",
      "What is hemp?", "What is the source of hemp?", "What are the uses of hemp?",
      "What are sutures?", "What is the classification of sutures?", "What are absorbable sutures?",
      "What are non-absorbable sutures?", "What is catgut?", "What is the source of catgut?",
      "What are the uses of catgut?", "What is silk?", "What is the source of silk?",
      "What are the uses of silk sutures?", "What is nylon?", "What are the uses of nylon sutures?",
      "What is polyester?", "What are the uses of polyester sutures?", "What is steel wire?",
      "What are the uses of steel wire sutures?", "What are surgical dressings?", "What is gauze?",
      "What is the source of gauze?", "What are the uses of gauze?", "What is bandage?",
      "What are the types of bandages?", "What is cotton wool?", "What is the source of cotton wool?",
      "What are the uses of cotton wool?", "What is plaster of Paris?", "What are the uses of plaster of Paris?",
    ],
    ch23: [
      "What are drugs of mineral origin?", "What is the classification of mineral drugs?", "What are the sources of mineral drugs?",
      "What are inorganic drugs?", "What are the uses of mineral drugs?", "What is calcium carbonate?",
      "What is the source of calcium carbonate?", "What are the uses of calcium carbonate?", "What is calcium hydroxide?",
      "What is the source of calcium hydroxide?", "What are the uses of calcium hydroxide?", "What is calcium oxide?",
      "What is the source of calcium oxide?", "What are the uses of calcium oxide?", "What is magnesium carbonate?",
      "What is the source of magnesium carbonate?", "What are the uses of magnesium carbonate?", "What is magnesium oxide?",
      "What is the source of magnesium oxide?", "What are the uses of magnesium oxide?", "What is zinc oxide?",
      "What is the source of zinc oxide?", "What are the uses of zinc oxide?", "What is iron oxide?",
      "What is the source of iron oxide?", "What are the uses of iron oxide?", "What is kaolin?",
      "What is the source of kaolin?", "What are the uses of kaolin?", "What is talc?",
      "What is the source of talc?", "What are the uses of talc?", "What is bentonite?",
      "What is the source of bentonite?", "What are the uses of bentonite?", "What is sodium chloride?",
      "What is the source of sodium chloride?", "What are the uses of sodium chloride?", "What is potassium chloride?",
      "What is the source of potassium chloride?", "What are the uses of potassium chloride?", "What is the identification of mineral drugs?",
    ],
    ch24: [
      "What is extraction?", "What is the principle of extraction?", "What are the methods of extraction?",
      "What is maceration?", "What is percolation?", "What is Soxhlet extraction?",
      "What is reflux extraction?", "What is ultrasonic extraction?", "What is microwave-assisted extraction?",
      "What is supercritical fluid extraction?", "What is the choice of solvent?", "What is the polarity of solvents?",
      "What is the principle of isolation?", "What are the methods of isolation?", "What is crystallization?",
      "What is fractional crystallization?", "What is chromatography?", "What is column chromatography?",
      "What is flash chromatography?", "What is vacuum liquid chromatography?", "What is the principle of purification?",
      "What is recrystallization?", "What is the choice of solvent for recrystallization?", "What is the decolorization?",
      "What is activated charcoal?", "What is the use of activated charcoal?", "What is the removal of tannins?",
      "What is the removal of pigments?", "What is the identification of compounds?", "What is TLC?",
      "What is the preparation of sample for TLC?", "What is the development of chromatogram?", "What is the detection of spots?",
      "What is the calculation of Rf value?", "What is the interpretation of TLC?", "What is the preparative TLC?",
      "What is the HPLC analysis?", "What is the GC analysis?", "What is the mass spectrometry?",
      "What is the NMR spectroscopy?", "What is the structure elucidation?", "What is the standardization of extracts?",
    ],
    ch28: [
      "What is marine pharmacognosy?", "What are the sources of marine drugs?", "What is the importance of marine organisms?",
      "What are marine algae?", "What are seaweeds?", "What are the medicinal compounds from algae?",
      "What is carrageenan from algae?", "What is agar from algae?", "What are alginates?",
      "What are sponges as source of drugs?", "What are sponges rich in?", "What are tunicates?",
      "What are the compounds from tunicates?", "What are mollusks as source of drugs?", "What are cephalopods?",
      "What are fish as source of drugs?", "What is fish oil?", "What are the uses of fish oil?",
      "What is shark cartilage?", "What are the uses of shark cartilage?", "What are marine toxins?",
      "What is saxitoxin?", "What is tetrodotoxin?", "What are the uses of marine toxins?",
      "What are marine antibiotics?", "What is the future of marine drugs?", "What is the biodiversity of oceans?",
      "What is the potential of marine drugs?", "What are the challenges in marine drug discovery?", "What is the collection of marine organisms?",
      "What is the cultivation of marine organisms?", "What is the sustainable harvesting?", "What is the isolation of marine compounds?",
      "What is the screening of marine extracts?", "What is the structure-activity relationship of marine compounds?",
      "What is the clinical trials of marine drugs?", "What is the FDA approved marine drugs?", "What is the economic potential of marine drugs?",
    ],
    ch30: [
      "What are natural pesticides?", "What is the importance of natural pesticides?", "What are the sources of natural pesticides?",
      "What are botanical pesticides?", "What are the advantages of botanical pesticides?", "What are the disadvantages of botanical pesticides?",
      "What is pyrethrum?", "What is the source of pyrethrum?", "What are the uses of pyrethrum?",
      "What is pyrethrin?", "What are the uses of pyrethrin?", "What is rotenone?",
      "What is the source of rotenone?", "What are the uses of rotenone?", "What is nicotine?",
      "What is the source of nicotine?", "What are the uses of nicotine as pesticide?", "What is neem?",
      "What is the source of neem?", "What are the uses of neem?", "What is azadirachtin?",
      "What are the uses of azadirachtin?", "What is palm oil?", "What are the uses of palm oil as pesticide?",
      "What are essential oils as pesticides?", "What is the mode of action of botanical pesticides?", "What is the persistence of botanical pesticides?",
      "What is the safety of botanical pesticides?", "What is the environmental impact?", "What is the regulation of natural pesticides?",
      "What is the integrated pest management?", "What is organic farming?", "What is the role of natural pesticides in organic farming?",
      "What are microbial pesticides?", "What is Bacillus thuringiensis?", "What are the uses of Bt?",
      "What are fungi as pesticides?", "What are viruses as pesticides?", "What are the advantages of microbial pesticides?",
    ],
    ch31: [
      "What are poisonous plants?", "What is the importance of studying poisonous plants?", "What are the effects of plant toxins?",
      "What are the sources of plant toxins?", "What is the classification of poisonous plants?", "What are the types of plant toxins?",
      "What are alkaloid toxins?", "What are glycoside toxins?", "What are resin toxins?",
      "What are protein toxins?", "What is digitalis?", "What is the toxicity of digitalis?",
      "What is oleander?", "What is the toxicity of oleander?", "What is castor bean?",
      "What is ricin?", "What is the toxicity of ricin?", "What is jimsonweed?",
      "What is atropine in jimsonweed?", "What is the toxicity of jimsonweed?", "What is poison ivy?",
      "What is urushiol?", "What is the toxicity of poison ivy?", "What is deadly nightshade?",
      "What is belladonna?", "What is the toxicity of belladonna?", "What is monkshood?",
      "What is aconitine?", "What is the toxicity of aconite?", "What is foxglove?",
      "What is the toxicity of foxglove?", "What is the treatment of plant poisoning?", "What is the first aid for plant poisoning?",
      "What is the identification of poisonous plants?", "What is the prevention of plant poisoning?", "What is the role of public awareness?",
      "What are the legal regulations for poisonous plants?", "What is the economic impact of poisonous plants?", "What is the ecological role of plant toxins?",
    ],
    ch32: [
      "What are natural allergens?", "What is an allergen?", "What is the immune response to allergens?",
      "What are the sources of natural allergens?", "What are plant allergens?", "What are animal allergens?",
      "What are food allergens?", "What is pollen allergy?", "What is the cause of pollen allergy?",
      "What is hay fever?", "What are the symptoms of pollen allergy?", "What is mold allergy?",
      "What are the sources of mold allergens?", "What is dust mite allergy?", "What are the sources of dust mites?",
      "What is latex allergy?", "What is the source of latex?", "What are the symptoms of latex allergy?",
      "What is bee venom allergy?", "What are the symptoms of bee venom allergy?", "What is the treatment of allergies?",
      "What are antihistamines?", "What are corticosteroids?", "What is immunotherapy?",
      "What is the mechanism of allergic reactions?", "What is IgE?", "What is the role of mast cells?",
      "What is histamine?", "What are the types of allergic reactions?", "What is Type I hypersensitivity?",
      "What is Type II hypersensitivity?", "What is Type III hypersensitivity?", "What is Type IV hypersensitivity?",
      "What is the diagnosis of allergies?", "What is the skin prick test?", "What is the blood test for allergies?",
      "What is the prevention of allergies?", "What is the epidemiology of allergies?", "What is the economic impact of allergies?",
    ],
    ch33: [
      "What are natural colors and dyes?", "What is the importance of natural colors?", "What are the sources of natural colors?",
      "What is the classification of natural dyes?", "What are the types of natural dyes?", "What are anthraquinone dyes?",
      "What is alizarin?", "What is the source of alizarin?", "What are the uses of alizarin?",
      "What is cochineal?", "What is the source of cochineal?", "What is carmine?",
      "What are the uses of cochineal?", "What is indigo?", "What is the source of indigo?",
      "What are the uses of indigo?", "What is woad?", "What is turmeric?",
      "What is the source of turmeric?", "What are the uses of turmeric as dye?", "What is saffron?",
      "What is the source of saffron?", "What are the uses of saffron?", "What is annatto?",
      "What is the source of annatto?", "What are the uses of annatto?", "What is betanin?",
      "What is the source of betanin?", "What are the uses of betanin?", "What is chlorophyll?",
      "What is the source of chlorophyll?", "What are the uses of chlorophyll?", "What is carotene?",
      "What is the source of carotene?", "What are the uses of carotene?", "What is the safety of natural dyes?",
      "What is the regulation of natural dyes?", "What is the environmental impact of dyes?", "What is the difference between natural and synthetic dyes?",
    ],
    ch34: [
      "What are hallucinogenic plants?", "What is hallucination?", "What is the history of hallucinogenic plants?",
      "What are the sources of hallucinogens?", "What is the classification of hallucinogens?", "What are the types of hallucinogenic compounds?",
      "What are indole hallucinogens?", "What are phenylethylamine hallucinogens?", "What is psilocybin?",
      "What is the source of psilocybin?", "What are the effects of psilocybin?", "What is LSD?",
      "What is the source of LSD?", "What are the effects of LSD?", "What is mescaline?",
      "What is the source of mescaline?", "What are the effects of mescaline?", "What is peyote?",
      "What is the source of peyote?", "What are the effects of peyote?", "What is DMT?",
      "What is the source of DMT?", "What are the effects of DMT?", "What is ayahuasca?",
      "What is the source of ayahuasca?", "What are the effects of ayahuasca?", "What is cannabis?",
      "What is the source of cannabis?", "What are the effects of cannabis?", "What is THC?",
      "What is the mechanism of hallucinogens?", "What is the effect on serotonin?", "What is the effect on dopamine?",
      "What is the medical use of hallucinogens?", "What is the therapeutic potential?", "What is the legal status?",
      "What is the safety concerns?", "What is the addiction potential?", "What is the public health impact?",
    ],
  };

  const templates = questionTemplates[chapterId] || [];
  const questions: { id: number; question: string; options: string[]; correct: number }[] = [];
  
  const optionSets: Record<string, string[]> = {
    default: ["True", "False", "Partially true", "None of the above"],
  };

  for (let i = 0; i < Math.min(50, templates.length); i++) {
    questions.push({
      id: i + 1,
      question: templates[i],
      options: optionSets.default,
      correct: Math.floor(Math.random() * 2),
    });
  }

  return questions;
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

  const questions = currentChapter ? generateQuestions(currentChapter.id) : [];
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
      return selectedAnswer === index ? "border-[#58CC02] bg-[#D7F5D7]" : "border-[#E5E5E5] hover:border-[#58CC02]";
    }
    if (index === question.correct) return "border-[#58CC02] bg-[#D7F5D7]";
    if (index === selectedAnswer && index !== question.correct) return "border-[#FF4B4B] bg-[#FFD6D6]";
    return "border-[#E5E5E5] opacity-50";
  };

  if (state === "complete") {
    return (
      <>
        <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center z-50">
          <button onClick={handleBackToChapters} className="text-[#58CC02] font-bold">← Back</button>
          <div className="flex gap-3.75">
            <span style={{ color: "#FF9600" }}>🔥 {streak}</span>
            <span style={{ color: "#58CC02" }}>⭐ {xp}</span>
            <span style={{ color: "#FF4B4B" }}>❤️ {hearts}</span>
          </div>
        </header>
        <main className="pt-28 px-5 max-w-[600px] mx-auto pb-8 flex flex-col items-center justify-center min-h-[80vh] text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-[32px] text-[#3C3C3C] mb-2">Chapter Complete!</h1>
          <p className="text-[#777] mb-6">You earned {questions.length * 10} XP</p>
          <button
            onClick={handleBackToChapters}
            className="bg-[#58CC02] text-white font-bold py-3 px-8 rounded-xl border-b-4 border-[#46A302] hover:bg-[#65Df0A] transition-colors"
          >
            Continue
          </button>
        </main>
      </>
    );
  }

  if (state === "quiz" && currentChapter && question) {
    return (
      <>
        <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center z-50">
          <button onClick={handleBackToChapters} className="text-[#58CC02] font-bold">← Quit</button>
          <div className="flex-1 mx-4 bg-[#E5E5E5] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#58CC02] h-full transition-all"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
          <div className="flex gap-3.75">
            <span style={{ color: "#FF9600" }}>🔥 {streak}</span>
            <span style={{ color: "#58CC02" }}>⭐ {xp}</span>
            <span style={{ color: "#FF4B4B" }}>❤️ {hearts}</span>
          </div>
        </header>
        <main className="pt-24 px-5 max-w-[600px] mx-auto pb-8">
          <div className="mb-6">
            <span className="text-[#777] text-sm">Question {currentQuestion + 1} of {questions.length}</span>
            <h2 className="text-2xl text-[#3C3C3C] font-bold mt-1">{question.question}</h2>
          </div>
          <div className="flex flex-col gap-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={showFeedback}
                className={`border-2 border-[#E5E5E5] rounded-xl p-4 text-left transition-colors ${getOptionStyle(index)}`}
              >
                <span className="font-bold mr-3">{String.fromCharCode(65 + index)}.</span>
                {option}
              </button>
            ))}
          </div>
          {showFeedback && (
            <div className="mt-6">
              <div className={`p-4 rounded-xl mb-4 ${selectedAnswer === question.correct ? "bg-[#D7F5D7] text-[#3C3C3C]" : "bg-[#FFD6D6] text-[#FF4B4B]"}`}>
                <h3 className="font-bold text-lg">
                  {selectedAnswer === question.correct ? "✅ Correct!" : "❌ Not quite!"}
                </h3>
                <p className="text-sm mt-1">
                  {selectedAnswer === question.correct
                    ? "Great job! Keep going!"
                    : `The correct answer is ${String.fromCharCode(65 + question.correct)}.`}
                </p>
              </div>
              <button
                onClick={handleNext}
                className="w-full bg-[#58CC02] text-white font-bold py-3 rounded-xl border-b-4 border-[#46A302] hover:bg-[#65Df0A] transition-colors"
              >
                {currentQuestion < questions.length - 1 ? "Continue" : "Finish"}
              </button>
            </div>
          )}
        </main>
      </>
    );
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center z-50">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 bg-[#58CC02] rounded-xl flex items-center justify-center text-white font-bold">
            P
          </div>
          <span className="font-bold text-xl">PharmaQuest</span>
        </div>
        <div className="flex gap-3.75">
          <span style={{ color: "#FF9600" }}>🔥 {streak}</span>
          <span style={{ color: "#58CC02" }}>⭐ {xp}</span>
          <span style={{ color: "#FF4B4B" }}>❤️ {hearts}</span>
        </div>
      </header>
      <main className="pt-28 px-5 max-w-[600px] mx-auto pb-8">
        <h1 className="text-[32px] text-[#3C3C3C] text-center mb-2.5">Learn Pharmacognosy</h1>
        <p className="text-center text-[#777] mb-7.5">Master the science of natural drugs</p>
        
        {phases.map((phase) => (
          <div key={phase} className="mb-6">
            <h2 className="text-lg font-bold text-[#3C3C3C] mb-3">Part {phase}: {phaseNames[phase]}</h2>
            <div className="flex flex-col gap-3">
              {chapters
                .filter((ch) => ch.phase === phase)
                .map((chapter) => (
                  <div
                    key={chapter.id}
                    onClick={() => handleChapterClick(chapter)}
                    className="border-2 border-[#E5E5E5] rounded-2xl p-4 flex items-center gap-4 bg-white cursor-pointer transition-colors hover:border-[#58CC02]"
                  >
                    <div className="w-[60px] h-[60px] rounded-xl bg-[#D7F5D7] flex items-center justify-center text-[28px]">
                      {completedChapters.includes(chapter.id) ? "✅" : chapter.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base text-[#3C3C3C] font-semibold mb-1">{chapter.title}</h3>
                      <p className="text-sm text-[#777]">{chapter.desc}</p>
                    </div>
                    <div className="text-[#58CC02] font-bold">→</div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </main>
    </>
  );
}
