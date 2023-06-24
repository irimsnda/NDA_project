Ext.define('Admin.view.promotionmaterials.views.containers.VetMedicinesPromoWrapper', {
    extend:'Ext.Container',
	xtype:'vetmedicinespromowrapper',
	itemId:'vetmedicinespromowrapper',
    layout: 'fit',
    items: [
        {
            xtype:'vetmedicinespromodashboard'
        }
    ]
});