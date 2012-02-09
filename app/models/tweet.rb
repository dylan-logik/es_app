class Tweet
  include Tire::Model::Search
  include Tire::Model::Callbacks
  include Tire::Model::Persistence
  include TweetFacets
   
  class << self
    
   def search(params)
      q = params[:q].nil? || params[:q].empty? ? '*:*' : params[:q]
      tire.search do |search|
        search.from( params[:page].to_i <= 1 ? 0 : (10 * (params[:page].to_i-1)) ) if params[:page]

        search.query do |query|
          query.string q
        end

        search.instance_eval(&hash_tag_facet)
        search.instance_eval(&user_facet)

        search.highlight :text
      end
    end

    def all(params)
      tire.search do |search|
        search.from( params[:page].to_i <= 1 ? 0 : (10 * (params[:page].to_i-1)) ) if params[:page]
        search.query { all }
        search.instance_eval(&hash_tag_facet)
        search.instance_eval(&user_facet)
      end
    end

    def find(id)
      id = id.to_s if id.is_a?(Integer)
      r = tire.search do |search|
        search.query do |query|
          query.term :_id, id
        end
      end

      r.results.first
    end

  end
end
