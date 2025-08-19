
export const validateEmail = (email:string): string => {
  if (!email) return "E-mail é Obrigatório";
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Email é Inválido";
  return "";
}

export const validateName = (name: string): string => {
  if(!name.trim()) return "Nome é Obrigatório";
  if(name.length < 3) return "Nome deve ter pelo menos 3 caracteres";
  return "";
}

export const validateDepartament = (departament: string): string => {
  if(!departament) return "Departamento é Obrigatório";
  return "";
}

export const validateGender = (gender: string): string => {
  if (!gender) return "Gênero é obrigatório"
  return ""
}

