object false
node(:results) { @response.results }
node(:facets) { @response.facets.select { |k,v| v['_type'] != 'statistical' }.map { |k,v| v.update({ name: k }) } }
node(:stats) { @response.facets.select { |k,v| v['_type'] == 'statistical' }.map { |k,v| v.update({ name: k }) } }
node(:total) { @response.total }
node(:took) { @response.time }
node(:page) { @page }
node(:perPage) { @perPage }
