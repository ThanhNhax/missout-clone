import slugify from 'slugify'
export function generateSlug(str) {
  
    
    return slugify(str, {lower:true, locale:'vi', trim:true});
  }