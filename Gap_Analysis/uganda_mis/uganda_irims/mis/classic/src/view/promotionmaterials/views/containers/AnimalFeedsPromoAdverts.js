Ext.define('Admin.view.promotionmaterials.views.containers.AnimalFeedsPromoAdverts', {
    extend: 'Ext.Container',
    xtype: 'foodpromoadverts',
	alias:'widget.animalfeedspromoadverts',
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
            value: 9
        },
        {
            xtype: 'promotionadvertsfoodwrapper',//'promotionmaterialswrapper',
            region: 'center'
        },
        {
            xtype: 'animalfeedspromoadvertstoolbar',
            region: 'south'
        }
    ]
});