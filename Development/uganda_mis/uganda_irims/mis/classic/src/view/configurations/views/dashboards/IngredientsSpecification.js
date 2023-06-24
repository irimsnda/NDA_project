Ext.define('Admin.view.configurations.views.dashboards.IngredientsSpecification', {
  extend: 'Ext.container.Container',
  xtype: 'ingredientsspecification',
  layout: 'responsivecolumn',
  controller: 'configurationsvctr',
  viewModel: 'configurationsvm',
  items: [
      {
          xtype: 'ingredientsspecificationpnl'
      }
  ]
});
