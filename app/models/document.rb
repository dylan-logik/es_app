class Document
  include Tire::Model::Search
  include Tire::Model::Callbacks
  include Tire::Model::Persistence
  include Facets

  class << self

    def search(params)
      q = params[:q].nil? || params[:q].empty? ? '*:*' : params[:q]
      tire.search do |search|
        search.query do |query|
          query.string q
        end

        search.instance_eval(&page_count_facet)
        search.instance_eval(&name_facet)
      
        search.highlight :text
      end
    end

    def all
      tire.search do |search|
        search.query { all }
        search.instance_eval(&page_count_facet)
        search.instance_eval(&name_facet)
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
