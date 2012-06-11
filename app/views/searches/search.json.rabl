object false
node(:results) { @response.results }
node(:facets) do
  date_facet = @response.facets.delete('created_at').tap do |f|
    f['_type'] = 'date'
    f['name']  = 'created_at'
  end

  date_facet = date_facet.select{ |k,v| %w{min max name _type}.include?(k) }

  @response.facets.select{ |k,v| v['_type'] != 'statistical' }.map{ |k,v| v.update({ name: k }) } | [date_facet]
end
node(:stats) { @response.facets.select{ |k,v| v['_type'] == 'statistical' }.map{ |k,v| v.update({ name: k }) } }
node(:total) { @response.total }
node(:took) { @response.time }
node(:page) { @page }
node(:perPage) { @perPage }
