
interface NameUrl {
  name: string;
  url: string;
}

interface Ability {
  is_hidden: boolean;
  slot: number;
  ability: NameUrl;
}

interface Form {
  name: string;
  url: string;
}

interface GameIndex {
  game_index: number;
  version: NameUrl;
}

interface VersionDetail {
  rarity: number;
  version: NameUrl;
}

interface HeldItem {
  item: NameUrl;
  version_details: VersionDetail[];
}

interface MoveLearnMethod {
  name: string;
  url: string;
}

interface VersionGroup {
  name: string;
  url: string;
}

interface VersionGroupDetail {
  level_learned_at: number;
  version_group: VersionGroup;
  move_learn_method: MoveLearnMethod;
  order: number;
}

interface Move {
  move: NameUrl;
  version_group_details: VersionGroupDetail[];
}

interface SpriteSet {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
}

interface DreamWorldSprites {
  front_default: string | null;
  front_female: string | null;
}

interface HomeSprites {
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
}

interface OfficialArtwork {
  front_default: string | null;
  front_shiny: string | null;
}

interface OtherSprites {
  dream_world: DreamWorldSprites;
  home: HomeSprites;
  "official-artwork": OfficialArtwork;
  showdown: SpriteSet;
}

interface GenerationSprites {
  [key: string]: SpriteSet | any;
}

interface VersionSprites {
  [key: string]: GenerationSprites;
}

interface Sprites {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
  other: OtherSprites;
  versions: VersionSprites;
}

interface Cries {
  latest: string;
  legacy: string;
}

interface Stat {
  base_stat: number;
  effort: number;
  stat: NameUrl;
}

interface Type {
  slot: number;
  type_name: string;
  type: NameUrl;
}

interface PastType {
  generation: NameUrl;
  types: Type[];
}

interface PastAbility {
  generation: NameUrl;
  abilities: Ability[];
}

export interface PokemonProps {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: Ability[];
  forms: Form[];
  game_indices: GameIndex[];
  held_items: HeldItem[];
  location_area_encounters: string;
  moves: Move[];
  species: NameUrl;
  sprites: Sprites;
  cries: Cries;
  stats: Stat[];
  types: Type[];
  past_types: PastType[];
  past_abilities: PastAbility[];
}

export interface PokemonSimpleProps {
  name: string;
  url: string;
}