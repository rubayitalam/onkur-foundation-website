const fs = require('fs');
const path = require('path');

const files = [
  'app/page.tsx',
  // will add more if needed
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');

  // Replace background colors to white
  content = content.replace(/bg-\[\#003B3F\]/g, 'bg-white');
  content = content.replace(/bg-\[\#1F4A3D\]/g, 'bg-white');
  content = content.replace(/bg-\[\#FBF6EE\](\/\d+)?/g, 'bg-white');
  
  // Text colors for headings and icons
  content = content.replace(/text-\[\#1F4A3D\]/g, 'text-secondary');
  content = content.replace(/text-\[\#FFFFFF\]/g, 'text-secondary');
  content = content.replace(/text-\[\#FBF6EE\]/g, 'text-text');
  content = content.replace(/text-\[\#2B2621\]/g, 'text-text');
  content = content.replace(/text-slate-800/g, 'text-secondary');

  // Primary colors (orange) for accents, buttons, icons
  content = content.replace(/text-\[\#C65D2E\]/g, 'text-primary');
  content = content.replace(/text-\[\#C9973B\]/g, 'text-primary');
  content = content.replace(/bg-\[\#C65D2E\]/g, 'bg-primary');
  content = content.replace(/bg-\[\#C9973B\]/g, 'bg-primary');
  
  // Border colors
  content = content.replace(/border-\[\#1F4A3D\]/g, 'border-secondary');
  content = content.replace(/border-\[\#C9973B\]/g, 'border-primary');
  content = content.replace(/border-\[\#C65D2E\]/g, 'border-primary');

  // Hover states
  content = content.replace(/hover:bg-\[\#b04f24\]/g, 'hover:opacity-90');
  content = content.replace(/hover:bg-\[\#15342b\]/g, 'hover:bg-gray-100');
  
  // Specific complex classes
  content = content.replace(/border-\[\#FBF6EE\]\/30/g, 'border-secondary/30');
  content = content.replace(/hover:border-\[\#FBF6EE\]/g, 'hover:border-secondary');
  content = content.replace(/hover:bg-white\/5/g, 'hover:bg-secondary/5');
  content = content.replace(/from-\[\#C9973B\]/g, 'from-primary/10');
  content = content.replace(/bg-\[\#C65D2E\]\/20/g, 'bg-primary/20');
  content = content.replace(/from-\[\#1F4A3D\]\/40/g, 'from-white/80');

  fs.writeFileSync(file, content);
  console.log(`Updated ${file}`);
}
