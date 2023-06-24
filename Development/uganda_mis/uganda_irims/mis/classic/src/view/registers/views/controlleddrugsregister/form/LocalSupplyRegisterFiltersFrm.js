Ext.define('Admin.view.reports.appsreport.controlleddrugsregister.form.LocalSupplyRegisterFiltersFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'localsupplyregisterfiltersfrm',
    layout: 'column',
    defaults: {
        columnWidth: 0.25
    },
      items:[{
            xtype: 'hiddenfield',
            name: 'module_id',
            value: 12,
            hidden: true
           },{
            xtype: 'hiddenfield',
            name: 'sub_module_id',
            value: 71,
            hidden: true
            },{
            xtype: 'datefield',
            emptyText: 'Released From',
            margin: 2,
            columnWidth: 0.2,
            labelAlign : 'top',
            format: 'Y-m-d',
            name: 'released_from',
            allowBlank: false,
            //minValue: new Date(2020, 6),
            maxValue: new Date()
        },{
           xtype: 'datefield',
           name: 'released_to', 
           margin: 2,
           format: 'Y-m-d',
           emptyText: 'Released To',
           abelAlign : 'top',
           allowBlank: false,
          // minValue: new Date(2020, 6),
           maxValue: new Date()
        },{ 
            xtype: 'button',
            text: 'Filter Report',  margin: 2,
            name: 'filter_SummaryReport',
            ui: 'soft-green',
            iconCls: 'fa fa-search',
            handler: 'loadOrderSupplyRegisterFilters',
            formBind: true,
        }
       ]
});