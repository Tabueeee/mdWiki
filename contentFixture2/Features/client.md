# Client

## VMFactory.js
- converts data to vm data (plain JS)

## knockoutView.js
- convert vm data to vm
- create components nav, nav-search
- displays list expandable on categories (default: collapsed)
- links in list load body with param ?content=1 to inject only the new content
- search filters plain vm data list and shows filtered list on value in input  


{name: key, entries: subCategories}


subcategories:
{name: subCategoryKey, items: subCategoryMap[subCategoryKey], collapsed: true}
