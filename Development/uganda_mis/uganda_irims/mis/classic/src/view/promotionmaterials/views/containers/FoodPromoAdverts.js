Ext.define('Admin.view.promotionmaterials.views.containers.FoodPromoAdverts', {
    extend: 'Ext.Container',
    xtype: 'foodpromoadverts',
	alias:'widget.foodpromoadverts',
    controller: 'promotionmaterialviewcontroller',
    layout: 'border',
    items: [
        {
            xtype: 'hiddenfield',
            name: 'module_id',
            value: 14
        },
        {
            xtype: 'hiddenfield',
            name: 'section_id',
            value: 1
        },
        {
            xtype: 'promotionadvertsfoodwrapper',//'promotionmaterialswrapper',
            region: 'center'
        },
        {
            xtype: 'foodpromoadvertstoolbar',
            region: 'south'
        }
    ]
});