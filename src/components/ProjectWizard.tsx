import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { X, ArrowLeft, ArrowRight, Languages } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";

interface ProjectWizardProps {
  language: "en" | "fr";
  onClose: () => void;
}

const ProjectWizard = ({ language, onClose }: ProjectWizardProps) => {
  const [currentLanguage, setCurrentLanguage] = useState<"en" | "fr">(language);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    region: "",
    department: "",
    address: "",
    floor: "",
    floorsAbove: "",
    height: "",
    width: "",
    clearance: "",
    wallWidth: "",
    heightUnderSlab: "",
    wallThickness: "",
    thicknessPH: "",
    thicknessPB: "",
    wallType: "",
    phType: "",
    pbType: "",
    localType: "",
    slabOption: "single",
    room1Width: "",
    room1SlabThickness: "",
    room1Space: "",
    room2Width: "",
    room2SlabThickness: "",
    room2Space: "",
    slabEqualsWallThickness: false,
  });

  const translations = {
    title: currentLanguage === "fr" ? "Titre du projet" : "Project Title",
    region: currentLanguage === "fr" ? "Région" : "Region",
    department: currentLanguage === "fr" ? "Département" : "Department",
    address: currentLanguage === "fr" ? "Adresse du projet" : "Project Address",
    floor: currentLanguage === "fr" ? "Etage du projet" : "Project Floor",
    floorsAbove: currentLanguage === "fr" ? "Nbr d'étages au dessus" : "Number of Floors Above",
    next: currentLanguage === "fr" ? "Suivant" : "Next",
    previous: currentLanguage === "fr" ? "Précédent" : "Previous",
    height: currentLanguage === "fr" ? "Hauteur de l'ouverture" : "Opening Height",
    width: currentLanguage === "fr" ? "Largeur de l'ouverture" : "Opening Width",
    technician: currentLanguage === "fr" ? "Technicien" : "Technician",
    selectOption: currentLanguage === "fr" ? "Sélectionner une option" : "Select an option",
    clearance: currentLanguage === "fr" ? "Allège" : "Clearance",
    wallWidth: currentLanguage === "fr" ? "Largeur du mur" : "Wall Width",
    heightUnderSlab: currentLanguage === "fr" ? "Hauteur sous dalle" : "Height Under Slab",
    wallThickness: currentLanguage === "fr" ? "Epaisseur mur" : "Wall Thickness",
    thicknessPH: currentLanguage === "fr" ? "Epaisseur Dalle PH" : "PH Slab Thickness",
    thicknessPB: currentLanguage === "fr" ? "Epaisseur Dalle PB" : "PB Slab Thickness",
    wallType: currentLanguage === "fr" ? "Type de mur" : "Wall Type",
    phType: currentLanguage === "fr" ? "Type de PH" : "PH Type",
    pbType: currentLanguage === "fr" ? "Type de PB" : "PB Type",
    localType: currentLanguage === "fr" ? "Type de local" : "Local Type",
    singleSideSlab: currentLanguage === "fr" ? "Dalle d'un seul côté du mur" : "Single Side Slab",
    doubleSideSlab: currentLanguage === "fr" ? "Dalle des deux côtés du mur" : "Double Side Slab",
    room1Width: currentLanguage === "fr" ? "Largeur chambre 1" : "Room 1 Width",
    room1SlabThickness: currentLanguage === "fr" ? "Epaisseur de la dalle 1" : "Slab 1 Thickness",
    room1Space: currentLanguage === "fr" ? "Espace 1 (nature local)" : "Space 1 (room type)",
    room2Width: currentLanguage === "fr" ? "Largeur chambre 2" : "Room 2 Width",
    room2SlabThickness: currentLanguage === "fr" ? "Epaisseur de la dalle 2" : "Slab 2 Thickness",
    room2Space: currentLanguage === "fr" ? "Espace 2 (nature local)" : "Space 2 (room type)",
    slabEqualsWallThickness: currentLanguage === "fr" ? "ed1 = eh" : "st1 = wt",
    yes: currentLanguage === "fr" ? "oui" : "yes",
    no: currentLanguage === "fr" ? "non" : "no",
    finish: currentLanguage === "fr" ? "Terminer" : "Finish",
    toggleLanguage: currentLanguage === "fr" ? "Switch to English" : "Passer en Français",
  };

  const regions = [
    { value: "ile-de-france", label: "Île-de-France" },
    { value: "auvergne-rhone-alpes", label: "Auvergne-Rhône-Alpes" },
    { value: "bourgogne-franche-comte", label: "Bourgogne-Franche-Comté" },
    { value: "bretagne", label: "Bretagne" },
    { value: "centre-val-de-loire", label: "Centre-Val de Loire" },
    { value: "grand-est", label: "Grand Est" },
    { value: "hauts-de-france", label: "Hauts-de-France" },
    { value: "normandie", label: "Normandie" },
    { value: "nouvelle-aquitaine", label: "Nouvelle-Aquitaine" },
    { value: "occitanie", label: "Occitanie" },
    { value: "pays-de-la-loire", label: "Pays de la Loire" },
    { value: "provence-alpes-cote-dazur", label: "Provence-Alpes-Côte d'Azur" },
    { value: "corse", label: "Corse" },
  ];

  const departments = [
    { value: "75", label: "Paris (75)" },
    { value: "77", label: "Seine-et-Marne (77)" },
    { value: "78", label: "Yvelines (78)" },
    { value: "91", label: "Essonne (91)" },
    { value: "92", label: "Hauts-de-Seine (92)" },
    { value: "93", label: "Seine-Saint-Denis (93)" },
    { value: "94", label: "Val-de-Marne (94)" },
    { value: "95", label: "Val-d'Oise (95)" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleLanguage = () => {
    setCurrentLanguage(prev => prev === "en" ? "fr" : "en");
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 overflow-y-auto pt-16 px-4 sm:px-6"
        onClick={e => e.stopPropagation()}
      >
        <div className="relative mx-auto max-w-2xl">
          <div className="glass-panel rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">
                {currentLanguage === "fr" 
                  ? "Création de projet" 
                  : "Project Creation"
                }
              </h2>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleLanguage}
                  className="hover:bg-accent"
                >
                  <Languages className="h-4 w-4" />
                </Button>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-500 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="p-6">
              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="space-y-4">
                      <div>
                        <label className="input-label">
                          {translations.title}
                        </label>
                        <Input
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          className="form-input"
                        />
                      </div>
                      <div>
                        <label className="input-label">
                          {translations.region}
                        </label>
                        <Select
                          value={formData.region}
                          onValueChange={(value) => setFormData(prev => ({ ...prev, region: value }))}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder={translations.selectOption} />
                          </SelectTrigger>
                          <SelectContent>
                            {regions.map((region) => (
                              <SelectItem key={region.value} value={region.value}>
                                {region.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="input-label">
                          {translations.department}
                        </label>
                        <Select
                          value={formData.department}
                          onValueChange={(value) => setFormData(prev => ({ ...prev, department: value }))}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder={translations.selectOption} />
                          </SelectTrigger>
                          <SelectContent>
                            {departments.map((department) => (
                              <SelectItem key={department.value} value={department.value}>
                                {department.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="input-label">
                          {translations.address}
                        </label>
                        <Input
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="form-input"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="input-label">
                            {translations.floor}
                          </label>
                          <Input
                            name="floor"
                            value={formData.floor}
                            onChange={handleInputChange}
                            className="form-input"
                          />
                        </div>
                        <div>
                          <label className="input-label">
                            {translations.floorsAbove}
                          </label>
                          <Input
                            name="floorsAbove"
                            value={formData.floorsAbove}
                            onChange={handleInputChange}
                            className="form-input"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : step === 2 ? (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <div className="flex gap-6">
                      <div className="w-1/3 bg-gray-100 rounded-lg overflow-hidden">
                        <img 
                          src="/lovable-uploads/f533125c-12ae-4b4e-af3e-5edc28551bc0.png" 
                          alt="Project visualization"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      
                      <div className="w-2/3 space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="input-label">
                              {translations.height} (cm)
                            </label>
                            <Input
                              name="height"
                              value={formData.height}
                              onChange={handleInputChange}
                              className="form-input"
                              type="number"
                            />
                          </div>
                          <div>
                            <label className="input-label">
                              {translations.width} (cm)
                            </label>
                            <Input
                              name="width"
                              value={formData.width}
                              onChange={handleInputChange}
                              className="form-input"
                              type="number"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="input-label">
                              {translations.clearance} (cm)
                            </label>
                            <Input
                              name="clearance"
                              value={formData.clearance}
                              onChange={handleInputChange}
                              className="form-input"
                              type="number"
                            />
                          </div>
                          <div>
                            <label className="input-label">
                              {translations.wallWidth} (cm)
                            </label>
                            <Input
                              name="wallWidth"
                              value={formData.wallWidth}
                              onChange={handleInputChange}
                              className="form-input"
                              type="number"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="input-label">
                              {translations.heightUnderSlab} (cm)
                            </label>
                            <Input
                              name="heightUnderSlab"
                              value={formData.heightUnderSlab}
                              onChange={handleInputChange}
                              className="form-input"
                              type="number"
                            />
                          </div>
                          <div>
                            <label className="input-label">
                              {translations.wallThickness} (cm)
                            </label>
                            <Input
                              name="wallThickness"
                              value={formData.wallThickness}
                              onChange={handleInputChange}
                              className="form-input"
                              type="number"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="input-label">
                              {translations.thicknessPH} (cm)
                            </label>
                            <Input
                              name="thicknessPH"
                              value={formData.thicknessPH}
                              onChange={handleInputChange}
                              className="form-input"
                              type="number"
                            />
                          </div>
                          <div>
                            <label className="input-label">
                              {translations.thicknessPB} (cm)
                            </label>
                            <Input
                              name="thicknessPB"
                              value={formData.thicknessPB}
                              onChange={handleInputChange}
                              className="form-input"
                              type="number"
                            />
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="input-label">
                              {translations.wallType}
                            </label>
                            <Select
                              value={formData.wallType}
                              onValueChange={(value) => setFormData(prev => ({ ...prev, wallType: value }))}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder={translations.selectOption} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="type1">Type 1</SelectItem>
                                <SelectItem value="type2">Type 2</SelectItem>
                                <SelectItem value="type3">Type 3</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <label className="input-label">
                              {translations.phType}
                            </label>
                            <Select
                              value={formData.phType}
                              onValueChange={(value) => setFormData(prev => ({ ...prev, phType: value }))}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder={translations.selectOption} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="type1">Type 1</SelectItem>
                                <SelectItem value="type2">Type 2</SelectItem>
                                <SelectItem value="type3">Type 3</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <label className="input-label">
                              {translations.pbType}
                            </label>
                            <Select
                              value={formData.pbType}
                              onValueChange={(value) => setFormData(prev => ({ ...prev, pbType: value }))}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder={translations.selectOption} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="type1">Type 1</SelectItem>
                                <SelectItem value="type2">Type 2</SelectItem>
                                <SelectItem value="type3">Type 3</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <label className="input-label">
                              {translations.localType}
                            </label>
                            <Select
                              value={formData.localType}
                              onValueChange={(value) => setFormData(prev => ({ ...prev, localType: value }))}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder={translations.selectOption} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="type1">Type 1</SelectItem>
                                <SelectItem value="type2">Type 2</SelectItem>
                                <SelectItem value="type3">Type 3</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <Button
                          variant="outline"
                          className="w-full mt-4"
                          onClick={() => {
                            // Handle technician contact
                          }}
                        >
                          {translations.technician}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <div className="flex gap-6">
                      <div className="w-1/3 bg-gray-100 rounded-lg overflow-hidden">
                        <img 
                          src="/lovable-uploads/f533125c-12ae-4b4e-af3e-5edc28551bc0.png" 
                          alt="Project visualization"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      
                      <div className="w-2/3 space-y-6">
                        <div className="space-y-4">
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="single"
                              checked={formData.slabOption === "single"}
                              onCheckedChange={() => setFormData(prev => ({ ...prev, slabOption: "single" }))}
                              className="h-5 w-5"
                            />
                            <Label htmlFor="single">{translations.singleSideSlab}</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="double"
                              checked={formData.slabOption === "double"}
                              onCheckedChange={() => setFormData(prev => ({ ...prev, slabOption: "double" }))}
                              className="h-5 w-5"
                            />
                            <Label htmlFor="double">{translations.doubleSideSlab}</Label>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="input-label">{translations.room1Width}</label>
                            <div className="flex items-center gap-2">
                              <Input
                                name="room1Width"
                                value={formData.room1Width}
                                onChange={handleInputChange}
                                type="number"
                                className="form-input"
                              />
                              <span>cm</span>
                            </div>
                          </div>

                          <div>
                            <label className="input-label">{translations.room1SlabThickness}</label>
                            <div className="flex items-center gap-2">
                              <Input
                                name="room1SlabThickness"
                                value={formData.room1SlabThickness}
                                onChange={handleInputChange}
                                type="number"
                                className="form-input"
                              />
                              <span>cm</span>
                            </div>
                          </div>

                          <div>
                            <label className="input-label">{translations.room1Space}</label>
                            <Select
                              value={formData.room1Space}
                              onValueChange={(value) => setFormData(prev => ({ ...prev, room1Space: value }))}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder={translations.selectOption} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="type1">Type 1</SelectItem>
                                <SelectItem value="type2">Type 2</SelectItem>
                                <SelectItem value="type3">Type 3</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          {formData.slabOption === "double" && (
                            <>
                              <div>
                                <label className="input-label">{translations.room2Width}</label>
                                <div className="flex items-center gap-2">
                                  <Input
                                    name="room2Width"
                                    value={formData.room2Width}
                                    onChange={handleInputChange}
                                    type="number"
                                    className="form-input"
                                  />
                                  <span>cm</span>
                                </div>
                              </div>

                              <div>
                                <label className="input-label">{translations.room2SlabThickness}</label>
                                <div className="flex items-center gap-2">
                                  <Input
                                    name="room2SlabThickness"
                                    value={formData.room2SlabThickness}
                                    onChange={handleInputChange}
                                    type="number"
                                    className="form-input"
                                  />
                                  <span>cm</span>
                                </div>
                              </div>

                              <div>
                                <label className="input-label">{translations.room2Space}</label>
                                <Select
                                  value={formData.room2Space}
                                  onValueChange={(value) => setFormData(prev => ({ ...prev, room2Space: value }))}
                                >
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder={translations.selectOption} />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="type1">Type 1</SelectItem>
                                    <SelectItem value="type2">Type 2</SelectItem>
                                    <SelectItem value="type3">Type 3</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </>
                          )}

                          <div className="flex items-center gap-4">
                            <label className="input-label">{translations.slabEqualsWallThickness}</label>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="eq-yes"
                                checked={formData.slabEqualsWallThickness}
                                onCheckedChange={(checked) => 
                                  setFormData(prev => ({ ...prev, slabEqualsWallThickness: checked === true }))
                                }
                                className="h-5 w-5"
                              />
                              <Label htmlFor="eq-yes">{translations.yes}</Label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 flex justify-between">
              <Button
                variant="outline"
                onClick={() => {
                  if (step === 1) onClose();
                  else setStep(prev => prev - 1);
                }}
                className="flex items-center gap-2"
              >
                <ArrowLeft size={16} />
                {step === 1 ? (
                  currentLanguage === "fr" ? "Fermer" : "Close"
                ) : (
                  translations.previous
                )}
              </Button>
              <Button
                onClick={() => {
                  if (step < 3) setStep(prev => prev + 1);
                  else console.log('Submit', formData);
                }}
                className="flex items-center gap-2"
              >
                {step < 3 ? translations.next : translations.finish}
                {step < 3 && <ArrowRight size={16} />}
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectWizard;
