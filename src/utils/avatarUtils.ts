// Função para gerar avatar aleatório baseado no gênero
export const generateRandomAvatar = (gender: 'male' | 'female', name: string): string => {
    // Lista de avatares masculinos
    const maleAvatars = [
      'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortFlat&accessoriesType=Prescription02&hairColor=BrownDark&facialHairType=BeardMedium&facialHairColor=BrownDark&clotheType=Hoodie&clotheColor=Gray01&eyeType=Happy&eyebrowType=DefaultNatural&mouthType=Smile&skinColor=Light',
      'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortWaved&accessoriesType=Blank&hairColor=BlondeGolden&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light',
      'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortRound&accessoriesType=Kurt&hairColor=Red&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=GraphicShirt&clotheColor=Heather&graphicType=Skull&eyeType=Squint&eyebrowType=Angry&mouthType=Serious&skinColor=Light',
      'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairDreads01&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=ShirtCrewNeck&clotheColor=Blue03&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light',
      'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairFrizzle&accessoriesType=Prescription01&hairColor=BrownDark&facialHairType=BeardMajestic&facialHairColor=BrownDark&clotheType=BlazerShirt&eyeType=Close&eyebrowType=AngryNatural&mouthType=Serious&skinColor=Light'
    ];
  
    // Lista de avatares femininos
    const femaleAvatars = [
      'https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Round&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light',
      'https://avataaars.io/?avatarStyle=Circle&topType=LongHairCurvy&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=ShirtCrewNeck&clotheColor=Blue03&eyeType=Happy&eyebrowType=DefaultNatural&mouthType=Smile&skinColor=Light',
      'https://avataaars.io/?avatarStyle=Circle&topType=LongHairMiaWallace&accessoriesType=Sunglasses&hairColor=BlondeGolden&facialHairType=Blank&clotheType=Overall&clotheColor=Gray01&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light',
      'https://avataaars.io/?avatarStyle=Circle&topType=LongHairCurly&accessoriesType=Blank&hairColor=Red&facialHairType=Blank&clotheType=BlazerSweater&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light',
      'https://avataaars.io/?avatarStyle=Circle&topType=LongHairBun&accessoriesType=Round&hairColor=BlondeGolden&facialHairType=Blank&clotheType=ShirtScoopNeck&clotheColor=Red&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light'
    ];
  
    // Seleciona a lista apropriada
    const avatars = gender === 'male' ? maleAvatars : femaleAvatars;
    
    // Gera um índice aleatório baseado no nome
    const charSum = name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const index = charSum % avatars.length;
    
    return avatars[index];
  };