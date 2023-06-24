Ext.define('Admin.view.promotionmaterials.views.containers.CosmeticPromoAdverts', {
    extend: 'Ext.Container',
    xtype: 'cosmeticpromoadverts',
	alias:'widget.cosmeticpromoadverts',
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
            value: 3
        },
        {
            xtype: 'promotionadvertcosmeticwrapper',
            region: 'center'
        },
        {
            xtype: 'cosmeticspromoadvertstoolbar',
            region: 'south'
        }
    ]
});