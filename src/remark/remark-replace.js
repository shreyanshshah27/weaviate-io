const visit = require('unist-util-visit');
const fs = require('fs');
const { appendDynamicConfig } = require('./dynamic-config');

// Read file config, which contains weaviate_version, etc.
const readSiteConfig = () => {
  const data = fs.readFileSync('versions-config.json');
  return JSON.parse(data);
}

let siteConfig = readSiteConfig();
appendDynamicConfig(siteConfig)
.then(() => console.log(siteConfig));

// console.log(siteConfig);

// pattern to match: ||site.some_name||
const pattern = /[|]{2}[ ]*site\.([a-z_]*)[ ]*[|]{2}/g
const interpolate = (value, vfile) => {
  // replace the pattern with config variables
  return value.replaceAll(pattern, (_, name) => {
    // display a warning if config variable is missing
    if (siteConfig[name] == undefined) {
      console.warn('\x1b[33m%s', vfile.path, '\x1b[0m');
      console.warn(`Couldn't find`, '\x1b[31m', `||site.${name}||`, '\x1b[0m');
    }
    return siteConfig[name]
  })
}

const valueNodes = ['text', 'jsx', 'code', 'inlineCode'];
const valueNodeFilter = (node) => 
  valueNodes.includes(node.type) && // contains one of the types in valueNodes
  !!node.value && node.value.includes('||') // it contains text '||'

// THE MAIN BODY OF THE PLUGIN
const plugin = (options) => {
  const transformer = async (ast, vfile) => {
    // First update all text, jsx, code and inlineCode elements
    visit(ast, valueNodeFilter, (node) => {
      node.value = interpolate(node.value, vfile);
    });

    // Then update links
    visit(ast, 'link', (node) => {
      if(node.url.includes('||')) {
        node.url = interpolate(node.url, vfile);
      }
    });
  };
  return transformer;
};

module.exports = plugin;
