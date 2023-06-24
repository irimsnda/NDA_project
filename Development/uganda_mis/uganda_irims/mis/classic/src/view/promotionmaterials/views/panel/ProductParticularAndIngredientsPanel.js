Ext.define('Admin.view.promotionmaterials.views.panels.ProductParticularAndIngredientsPanel', {
    extend: 'Ext.panel.Panel',
    viewModel:'promotionmaterialsviewmodel',
    xtype: 'productparticularandingredientspanel',
	
   layout:'fit',
	product_id:0,
    items: [
         {
            xtype:'promotionmaterialproductparticularsform', //'promotionmaterialproductparticularsform',
			height:'75%'
        }, 
		{
            title:'Ingredients and their Strength',
			xtype: 'productingredientsstrengthgrid',
            hidde: true,
			height:'75%'
        }
    ]
});