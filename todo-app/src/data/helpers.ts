type GenerateId = () => string;
export const generateId: GenerateId = () => new Date().getTime().toString();
