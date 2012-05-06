class Tweet
  include Tire::Model::Search
  include Tire::Model::Persistence

  def self.search(params)
    q = params[:q].nil? || params[:q].empty? ? '*:*' : params[:q]

    tire.search do |search|
      search.from( params[:page].to_i <= 1 ? 0 : (10 * (params[:page].to_i-1)) ) if params[:page]
      search.query do |query|
        if params['filter']
          filters = Yajl::Parser.parse(params['filter'])
          filter_type = filters.keys.first
          filter_value = filters[filter_type]
          query.filtered do |filtered|
            filtered.filter filter_type, filter_value
            filtered.query do |filtered_query|
              filtered_query.string q
            end
          end
        else
          query.string q
        end
      end

      TweetFacets.facets { |f| search.instance_eval(&f) }

      search.highlight :text
    end
  end

  def self.all(params)
    tire.search do |search|
      search.from( params[:page].to_i <= 1 ? 0 : (10 * (params[:page].to_i-1)) ) if params[:page]
      search.query { all }
      TweetFacets.facets { |f| search.instance_eval(&f) }
    end
  end

  def update_attributes(attributes = {})
  end

  def update_attribute(name, value)
  end

  def to_indexed_json
  end
end
