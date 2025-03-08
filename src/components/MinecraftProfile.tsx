import { useState, useEffect } from "react";
import { ArrowPathIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";

interface ProfileProperty {
  name: string;
  value: string;
}

interface MinecraftProfileData {
  id: string;
  name: string;
  properties: ProfileProperty[];
}

interface TextureData {
  timestamp: number;
  profileId: string;
  profileName: string;
  textures: {
    SKIN?: {
      url: string;
    };
    CAPE?: {
      url: string;
    };
  };
}

interface MinecraftProfileProps {
  profileData: MinecraftProfileData;
}

const poses = [
  "default",
  "marching",
  "walking",
  "crouching",
  "crossed",
  "criss_cross",
  "ultimate",
  "cheering",
  "relaxing",
  "trudging",
  "cowering",
  "pointing",
  "lunging",
  "dungeons",
  "facepalm",
  "sleeping",
  "dead",
  "archer",
  "kicking",
  "reading",
]

export function MinecraftProfile({ profileData }: MinecraftProfileProps) {
  const [textureData, setTextureData] = useState<TextureData | null>(null)
  const [randomPose, setRandomPose] = useState(() => poses[Math.floor(Math.random() * poses.length)])

  const getRandomPose = () => {
    let newPose
    do {
      newPose = poses[Math.floor(Math.random() * poses.length)]
    } while (newPose === randomPose)
    
    setRandomPose(newPose)
  };

  useEffect(() => {
    const textureProperty = profileData.properties.find(
      (prop) => prop.name === "textures"
    );

    if (textureProperty) {
      try {
        // Decodificar Base64 a JSON
        const decodedValue = atob(textureProperty.value);
        const parsedData = JSON.parse(decodedValue);
        setTextureData(parsedData);
      } catch (error) {
        console.error("Error al decodificar datos de textura:", error);
      }
    }
  }, [profileData]);

  if (!textureData) {
    return (
      <div className="p-6 bg-[#1E1E1E] rounded-lg shadow-xl text-center">
        <p className="text-white">Cargando datos de perfil...</p>
      </div>
    );
  }

  const skinUrl = textureData.textures.SKIN?.url;
  const capeUrl = textureData.textures.CAPE?.url;

  // Formatear la fecha del timestamp
  const formattedDate = new Date(textureData.timestamp).toLocaleDateString(
    "es-ES",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  return (
    <div className="p-6 bg-[#1E1E1E] rounded-lg shadow-xl w-[836px]">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <header className="flex gap-4">
          <img
            src={`https://crafatar.com/avatars/${profileData.id}?size=100&overlay`}
            alt={`Avatar de ${profileData.name}`}
            className="w-10 h-10"
          />
          <h2 className="text-3xl font-bold text-white flex items-center mb-4 md:mb-0">
            {profileData.name}
          </h2>
        </header>
        <a
          href={`https://es.namemc.com/search?q=${profileData.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline font-medium flex items-center justify-center"
        >
          <span>Ver en NameMC</span>
          <ArrowTopRightOnSquareIcon className="size-4.5 ml-2" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#2A2A2A] rounded-lg p-5">
          <h3 className="text-xl font-semibold text-white mb-4">
            Información del perfil
          </h3>
          <div className="space-y-3">
            <div>
              <p className="text-gray-400 text-sm">UUID</p>
              <p className="text-white font-mono bg-[#1E1E1E] p-2 rounded">
                {profileData.id}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Nombre</p>
              <p className="text-white font-semibold">{profileData.name}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Última actualización</p>
              <p className="text-white">{formattedDate}</p>
            </div>
          </div>
        </div>

        {skinUrl && (
          <div className="bg-[#2A2A2A] rounded-lg p-5">
            <header className="flex items-center justify-between mb-4">
              <h3 className="text-lg text-white uppercase font-minecraft">{randomPose}</h3>
              <button onClick={getRandomPose} className="reload-button hover:rotate-180 transition-transform duration-300 cursor-pointer"><ArrowPathIcon className="size-5"/></button>
            </header>
            <div className="flex flex-col items-center">
              <div className="flex flex-col md:flex-row gap-6 items-center justify-center mb-4">
                <div className="flex flex-col items-center">
                  <img
                    src={`https://starlightskins.lunareclipse.studio/render/${randomPose}/${profileData.id}/full`}
                    alt={`Skin de ${profileData.name}`}
                    className="h-48 object-contain rounded"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <a
                  href={skinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 text-sm flex items-center"
                >
                  <span>Ver textura original</span>
                  <ArrowTopRightOnSquareIcon className="size-4 ml-2" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Capa (si existe) */}
        {capeUrl && (
          <div className="bg-[#2A2A2A] rounded-lg p-5 md:col-span-2">
            <h3 className="text-xl font-semibold text-white mb-4">Capa</h3>
            <div className="flex flex-col items-center">
              <img
                src={`https://crafatar.com/capes/${profileData.id}`}
                alt={`Capa de ${profileData.name}`}
                className="h-24 object-contain mb-4 rounded"
              />
              <a
                href={capeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 text-sm flex items-center"
              >
                <span>Ver capa completa</span>
                <ArrowTopRightOnSquareIcon className="size-4 ml-2" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
