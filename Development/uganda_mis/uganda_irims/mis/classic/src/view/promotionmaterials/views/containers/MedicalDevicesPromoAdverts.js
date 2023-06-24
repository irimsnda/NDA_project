Ext.define('Admin.view.promotionmaterials.views.containers.MedicalDevicesPromoAdverts', {
    extend: 'Ext.Container',
    xtype: 'medicaldevicespromoadverts',
	alias:'widget.medicaldevicespromoadverts',
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
            value: 4
        },
        {
            xtype: 'promotionadvertmedicaldeviceswrapper',
            region: 'center'
        },
        {
            xtype: 'medicaldevicespromoadvertstoolbar',
            region: 'south'
        }
    ]
});