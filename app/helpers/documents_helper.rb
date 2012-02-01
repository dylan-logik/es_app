module DocumentsHelper
  def parse_facet(name, args)
    OpenStruct.new(args.update(name: name))
  end
end
