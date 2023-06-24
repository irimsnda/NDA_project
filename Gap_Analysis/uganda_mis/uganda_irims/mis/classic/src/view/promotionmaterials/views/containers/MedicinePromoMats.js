Ext.define('Admin.view.promotionmaterials.views.containers.MedicinePromoMats', {
    extend: 'Ext.Container',
    xtype: 'medicinepromomats',
	alias:'widget.medicinepromomats',
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
            value: 2
        },
        {
            xtype: 'promotionmaterialswrapper',
            region: 'center'
        },
        {
            xtype: 'medicinepromomaterialstoolbar',//'drugspremregtb',
            region: 'south'
        }
    ]
});