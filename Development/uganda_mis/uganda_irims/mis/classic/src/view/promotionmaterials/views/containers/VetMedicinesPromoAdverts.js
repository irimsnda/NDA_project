Ext.define('Admin.view.promotionmaterials.views.containers.VetMedicinesPromoAdverts', {
    extend: 'Ext.Container',
    xtype: 'vetmedicinespromoadverts',
	alias:'widget.vetmedicinespromoadverts',
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
            xtype: 'vetmedicinespromowrapper',//'promotionmaterialswrapper',
            region: 'center'
        },
        {
            xtype: 'vetmedicinespromotoolbar',
            region: 'south'
        }
    ]
});