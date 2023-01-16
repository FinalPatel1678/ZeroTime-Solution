export interface CVEDataMeta {
  ID: string;
  ASSIGNER: string;
}

export interface Description {
  lang: string;
  value: string;
}

export interface ProblemtypeData {
  description: Description[];
}

export interface Problemtype {
  problemtype_data: ProblemtypeData[];
}

export interface ReferenceData {
  url: string;
  name: string;
  refsource: string;
  tags: string[];
}

export interface References {
  reference_data: ReferenceData[];
}

export interface DescriptionData {
  lang: string;
  value: string;
}

export interface Description2 {
  description_data: DescriptionData[];
}

export interface Cve {
  data_type: string;
  data_format: string;
  data_version: string;
  CVE_data_meta: CVEDataMeta;
  problemtype: Problemtype;
  references: References;
  description: Description2;
}

export interface CpeMatch {
  vulnerable: boolean;
  cpe23Uri: string;
  cpe_name: string[];
  versionEndExcluding?: string;
  versionEndIncluding?: string;
  versionStartExcluding?: string;
  versionStartIncluding?: string;
}

export interface Node {
  operator: "OR" | "AND";
  children: Node[];
  cpe_match: CpeMatch[];
}

export interface Configurations {
  CVE_data_version: string;
  nodes: Node[];
}

export interface CvssV3 {
  version: string;
  vectorString: string;
  attackVector: string;
  attackComplexity: string;
  privilegesRequired: string;
  userInteraction: string;
  scope: string;
  confidentialityImpact: string;
  integrityImpact: string;
  availabilityImpact: string;
  baseScore: number;
  baseSeverity: string;
}

export interface BaseMetricV3 {
  cvssV3: CvssV3;
  exploitabilityScore: number;
  impactScore: number;
}

export interface CvssV2 {
  version: string;
  vectorString: string;
  accessVector: string;
  accessComplexity: string;
  authentication: string;
  confidentialityImpact: string;
  integrityImpact: string;
  availabilityImpact: string;
  baseScore: number;
}

export interface BaseMetricV2 {
  cvssV2: CvssV2;
  severity: string;
  exploitabilityScore: number;
  impactScore: number;
  obtainAllPrivilege: boolean;
  obtainUserPrivilege: boolean;
  obtainOtherPrivilege: boolean;
  userInteractionRequired: boolean;
  acInsufInfo?: boolean;
}

export interface Impact {
  baseMetricV3: BaseMetricV3;
  baseMetricV2: BaseMetricV2;
}

export interface CVEItem {
  cve: Cve;
  configurations: Configurations;
  impact: Impact;
  publishedDate: string;
  lastModifiedDate: string;
}

export interface RootObject {
  CVE_data_type: string;
  CVE_data_format: string;
  CVE_data_version: string;
  CVE_data_numberOfCVEs: string;
  CVE_data_timestamp: string;
  CVE_Items: CVEItem[];
}
