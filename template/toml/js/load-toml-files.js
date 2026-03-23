function loadTomlFiles(pagePath,divID) {
  d3.text(pagePath).then(function(data) {
    // Path is replaced further down page. Reactivate after adding menu.
    var pencil = "<div class='markdownEye' style='display:none;position:absolute;font-size:28px;right:0px;text-decoration:none;opacity:.7'><a href='" + pagePath + "' style='color:#555'>…</a></div>";
    // CUSTOM About YAML metadata converter: https://github.com/showdownjs/showdown/issues/260

    // Also try adding simpleLineBreaks http://demo.showdownjs.com/

    var converter = new showdown.Converter({tables:true, metadata:true, simpleLineBreaks: true}),
    html = pencil + converter.makeHtml(data);

    var metadata = converter.getMetadata(true); // returns a string with the raw metadata
    var metadataFormat = converter.getMetadataFormat(); // returns the format of the metadata

    // This returns YAML and JSON at top of README.md page.
    if (metadata) {
      //alert(metadata);

      /*
      // UNDER DEVELOPMENT
      // Planning to use one of these:
      // https://github.com/jeremyfa/yaml.js  (See: https://www.npmjs.com/package/yamljs)
      // https://github.com/nodeca/js-yaml

      obj = jsYaml.load(metadata, { schema: SEXY_SCHEMA });

      result.setOption('mode', 'javascript');
      result.setValue(inspect(obj, false, 10));

      convertToHtmlTable(obj);

      html = metadata + html;
      */
    }
    //document.getElementById(divID).innerHTML = html; // Overwrites

    //data = data.replace(*\[*?)(?:\n)(*?\]*,[]) // Not working for replacing all line returns between brackets
    data = data.replace(/\[\n/g, '[') // Replace line return after bracket
    data = data.replace(/\[[ ]*"/g, '["') // Replace [ then arbitrary amount of spaces then a quote
    data = data.replace(/,\n[ ]*/g, ',') // Replace comma following by line return and any amount of space
    data = data.replace(/\n\]/g, ']') // Replace line return before bracket
    // Posted issue: https://github.com/JonAbrams/tomljs/issues/2

    var thediv = document.getElementById(divID);
    //loadIntoDiv(pageFolder,divID,thediv,html,0,callback);
    thediv.innerHTML = data;
    convertTomlToHtml(); // Move this

  });
}