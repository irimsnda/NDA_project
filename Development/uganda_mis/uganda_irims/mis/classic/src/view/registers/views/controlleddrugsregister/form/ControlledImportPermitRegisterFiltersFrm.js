Ext.define('Admin.view.reports.appsreport.controlleddrugsregister.form.ControlledImportPermitRegisterFiltersFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'controlleddrugsimportpermitregisterfiltersfrm',
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
            value: 61,
            hidden: true
            },{
            xtype: 'combo',
            emptyText: 'Select Import/Export Permit Type',
             margin: 2,
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            labelAlign : 'top',
            displayField: 'name',
            name: 'permit_type',
            allowBlank: false,
            fieldStyle: {
                'color': 'green',
                'font-weight': 'bold'
            },
             listeners: {
                beforerender: {
                    fn: 'setOrgConfigCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                        url: 'newreports/getControlledDrugsPermitType',
                        extraParams: {
                            table_name: 'par_importexport_permittypes'
                    
                        }
                       }
                    },
                    isLoad: true
                },
                beforequery: function() {
                      var store = this.getStore();

                      var all = { name: 'All', id: 0 };
                      store.insert(0, all);
                  },
                  afterrender: function(combo) {
                      combo.select(combo.getStore().getAt(0));
                  },
                  
              }       
                
        },{
            xtype: 'datefield',
            emptyText: 'Released From',
            margin: 2,
            columnWidth: 0.2,
            labelAlign : 'top',
            format: 'Y-m-d',
            name: 'released_from',
            allowBlank: false,
          //  minValue: new Date(2020, 6),
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
        },
        { 
            xtype: 'button',
            text: 'Filter Report',  margin: 2,
            name: 'filter_SummaryReport',
            ui: 'soft-green',
            iconCls: 'fa fa-search',
            handler: 'loadImportPermitRegistertFilters',
            formBind: true,
        }
       ]
});