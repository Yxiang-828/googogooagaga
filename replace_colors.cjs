const fs = require('fs');
const path = require('path');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let updated = content
                .replace(/bg-\[#0A0C10\]/g, 'bg-[var(--center-channel-bg)]')
                .replace(/bg-\[#0F1115\]/g, 'bg-[color:rgba(var(--center-channel-color-rgb),0.02)]')
                .replace(/bg-\[#15171C\]/g, 'bg-[color:rgba(var(--center-channel-color-rgb),0.04)]')
                .replace(/bg-\[#1A1D24\]/g, 'bg-[color:rgba(var(--center-channel-color-rgb),0.08)]')
                .replace(/border-gray-800/g, 'border-[color:rgba(var(--center-channel-color-rgb),0.12)]')
                .replace(/border-gray-800\/50/g, 'border-[color:rgba(var(--center-channel-color-rgb),0.06)]')
                .replace(/text-gray-100/g, 'text-[var(--center-channel-color)]')
                .replace(/text-gray-200/g, 'text-[color:rgba(var(--center-channel-color-rgb),0.9)]')
                .replace(/text-gray-300/g, 'text-[color:rgba(var(--center-channel-color-rgb),0.8)]')
                .replace(/text-gray-400/g, 'text-[color:rgba(var(--center-channel-color-rgb),0.6)]')
                .replace(/text-gray-500/g, 'text-[color:rgba(var(--center-channel-color-rgb),0.5)]')
                .replace(/hover:bg-gray-800/g, 'hover:bg-[color:rgba(var(--center-channel-color-rgb),0.08)]')
                .replace(/hover:bg-\[#15171C\]\/50/g, 'hover:bg-[color:rgba(var(--center-channel-color-rgb),0.04)]')
                .replace(/bg-gray-800/g, 'bg-[color:rgba(var(--center-channel-color-rgb),0.1)]')
                .replace(/bg-gray-900\/50/g, 'bg-[color:rgba(var(--center-channel-color-rgb),0.04)]')
                .replace(/bg-blue-600\/20/g, 'bg-[var(--mention-bg)]')
                .replace(/text-blue-400/g, 'text-[var(--link-color)]')
                .replace(/text-blue-500/g, 'text-[var(--link-color)]')
                .replace(/border-blue-500/g, 'border-[var(--button-bg)]')
                .replace(/border-l-blue-500/g, 'border-l-[var(--button-bg)]')
                .replace(/border-blue-500\/30/g, 'border-[color:rgba(var(--button-bg-rgb),0.3)]')
                .replace(/shadow-\[.*?\]/g, 'shadow-sm')
                .replace(/shadow-xl/g, 'shadow-md')
                .replace(/shadow-md/g, 'shadow-sm');
                
            if (content !== updated) {
                fs.writeFileSync(fullPath, updated);
            }
        }
    }
}

processDir('./src');
