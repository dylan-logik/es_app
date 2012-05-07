class Tweet
  extend TweetFacets
  include Tire::Model::Search
  include Tire::Model::Persistence

  def self.per_page
    10
  end

  def self.search(options)
    options ||= {}
    options[:per_page] ||= self.per_page

    query = options[:query].nil? || options[:query].empty? ? "*:*" : options[:query]
    sort  = Array( options[:order] || options[:sort] )

    tire.search do |search|
      search.size( options[:per_page].to_i ) if options[:per_page]
      search.from( options[:page].to_i <= 1 ? 0 : (options[:per_page].to_i * (options[:page].to_i-1)) ) if options[:page] && options[:per_page]
      search.sort do
        sort.each do |t|
          field_name, direction = t.split(' ')
          by field_name, direction
        end
      end unless sort.empty?

      search.query(&build_query(query, options))
      self.facets { |f| search.instance_eval(&f) }

      search.highlight :text

      search.fields Array( options[:fields] ) if options[:fields]
    end
  end

  def to_indexed_json
  end

  protected

  def self.build_query(query, options) 
    Proc.new do
      if options['filter']
        filters = Yajl::Parser.parse(options['filter'])
        filtered do |filtered|
          filters.each do |f|
            f = f.flatten
            filtered.filter f[0], f[1]
          end
          filtered.query { string query }
        end
      else
        string query
      end
    end
  end

end
