Ext.define('Admin.view.configurations.views.dashboards.PromotionalMaterialPnl', {
     extend: 'Ext.panel.Panel',
    xtype: 'PromotionalMaterialPnl',
	alias:'widget.PromotionalMaterialPnl',
    layout: 'responsivecolumn',
    controller: 'configurationsvctr',
    viewModel: 'configurationsvm',
	title:'test',
    items: [
        {
            xtype: 'PromotionMaterialsGrid'//'dosageFormPnl'
        }
    ] 

});
