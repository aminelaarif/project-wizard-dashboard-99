
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ProjectWizard from "@/components/ProjectWizard";
import { Plus } from "lucide-react";

const Index = () => {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [language, setLanguage] = useState<"en" | "fr">("fr");

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-semibold text-gray-900">
            {language === "fr" ? "Tableau de bord" : "Dashboard"}
          </h1>
          <div className="flex gap-4 items-center">
            <Button
              variant="outline"
              onClick={() => setLanguage(lang => lang === "fr" ? "en" : "fr")}
              className="px-4 py-2 text-sm"
            >
              {language === "fr" ? "EN" : "FR"}
            </Button>
            <Button
              onClick={() => setIsWizardOpen(true)}
              className="flex items-center gap-2"
            >
              <Plus size={18} />
              {language === "fr" ? "Créer un projet" : "Create Project"}
            </Button>
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Empty state */}
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">
              {language === "fr" 
                ? "Aucun projet pour le moment. Créez votre premier projet!"
                : "No projects yet. Create your first project!"
              }
            </p>
          </div>
        </div>
      </div>

      {/* Project Creation Wizard */}
      {isWizardOpen && (
        <ProjectWizard
          language={language}
          onClose={() => setIsWizardOpen(false)}
        />
      )}
    </div>
  );
};

export default Index;
