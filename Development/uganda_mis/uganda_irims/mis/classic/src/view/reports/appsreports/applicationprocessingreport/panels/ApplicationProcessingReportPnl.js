Ext.define('Admin.view.reports.appsreport.applicationprocessingreport.panel.ApplicationProcessingReportPnl', {
   extend: 'Ext.panel.Panel',
    xtype: 'applicationprocessingreportpnl',
    itemId:'applicationprocessingreportpnl',
    margin: 2,
    layout: 'border',
    controller: 'applicationprocessingreportctr',
    defaults: {
        bodyPadding: 1,
        scrollable: true,
    },
    items: [
      {
            xtype: 'applicationprocessingtabpnl',
            region: 'center'
        }],
  tbar: [{
        xtype: 'tbspacer',
        width: 5
    }, {
        xtype: 'combo',
        emptyText: 'SECTION',
        flex: 1,
        //labelWidth: 80,
        width: 150,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'section_id',
        queryMode: 'local',
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
                        extraParams: {
                            model_name: 'Section'
                        }
                    }
                },
                isLoad: true
            },
            change: function (cmbo, newVal) {
                var grid = cmbo.up('grid');
               // grid.getStore().load();
            }
        },
        triggers: {
            clear: {
                type: 'clear',
                hideWhenEmpty: true,
                hideWhenMouseOut: false,
                clearOnEscape: true
            }
        }
    }, {
        xtype: 'combo',
        emptyText: 'MODULE',
        flex: 1,
        //labelWidth: 80,
        width: 150,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'module_id',
        queryMode: 'local',
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        },
        listeners: {
            beforerender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        extraParams: {
                            model_name: 'Module'
                        }
                    }
                },
                isLoad: true
            },
            change: function (cmbo, newVal) {
                var panel = cmbo.up('panel'),
                    sub_module = panel.down('combo[name=sub_module_id]'),
                    sub_module_str = sub_module.getStore();
                     sub_module_str.removeAll();
                    sub_module_str.load({params: {module_id: newVal}});
                   // grid.getStore().load();
            }
        },
        triggers: {
            clear: {
                type: 'clear',
                hideWhenEmpty: true,
                hideWhenMouseOut: false,
                clearOnEscape: true
            }
        }
    }, {
        xtype: 'combo',
        emptyText: 'SUB MODULE',
        flex: 1,
        //labelWidth: 80,
        width: 150,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'sub_module_id',
        queryMode: 'local',
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        },
        listeners: {
            beforerender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'workflow/getSystemSubModules',
                        extraParams: {
                            model_name: 'SubModule'
                        }
                    }
                },
                isLoad: false
            }
        },
        triggers: {
            clear: {
                type: 'clear',
                hideWhenEmpty: true,
                hideWhenMouseOut: false,
                clearOnEscape: true
            }
        }
    }, {
            xtype: 'datefield',
            emptyText: 'Date From',
            flex: 1,
            columnWidth: 0.25,
            labelAlign : 'top',
            format: 'Y-m-d',
            name: 'from_date',
            allowBlank: false,
            fieldStyle: {
                'color': 'green',
                'font-weight': 'bold'
            },
            minValue: new Date(2020, 6)
           
        },{
            xtype: 'datefield',
            name: 'to_date',  margin: 2,
            format: 'Y-m-d',
            emptyText: 'Date To',
            labelAlign : 'top',
            allowBlank: false,
            fieldStyle: {
                'color': 'green',
                'font-weight': 'bold'
           },
            minValue: new Date(2020, 6),
            maxValue: new Date()
           
        },
        {
        xtype: 'button',
        text: 'Filter',
        ui: 'soft-green',
        iconCls: 'x-fa fa-search',
        handler: function(btn) {
          var panel = btn.up('panel'),
              grid1 = Ext.ComponentQuery.query('#applicationprocessingreportgrid')[0];
              grid1.getStore().load();
              grid2 = Ext.ComponentQuery.query('#applicationprocessingreportpnl')[0];
              grid2.getStore().load();
        },
    },{
        xtype: 'button',
        text: 'Clear',
        ui: 'soft-red',
        iconCls: 'x-fa fa-close',
        handler: function(btn) {
          var panel = btn.up('panel'),
              grid = panel.down('grid'),
                gridStr = grid.getStore();
                panel.down('combo[name=section_id]').clearValue();
                panel.down('combo[name=module_id]').clearValue();
                panel.down('combo[name=sub_module_id]').clearValue();
                panel.down('datefield[name=from_date]').setValue('');
                panel.down('datefield[name=to_date]').setValue('');
                gridStr.load();
        },
    }
    ],
  bbar: [{
        xtype: 'toolbar',
        width: '100%',
        ui: 'footer',
        items: [
        {
            xtype:'button',
            ui: 'soft-green',
            text: 'Print  Application Processing Report',
            iconCls: 'x-fa fa-print',
            handler: 'printApplicationProcessingReport',
           
        },
          {
            xtype:'button',
            ui: 'soft-green',
            text: 'Export Application Processing Report',
            iconCls: 'x-fa fa-file',
            handler: 'exportApplicationProcessingReport'
           
        },
        '->',
        {
            xtype:'button',
            text: 'Preview  Alarming Applications',
            ui:'soft-red',
            iconCls: 'x-fa fa-eye',
            handler: 'funcPreviewprocessingAlertingApplications'
            
            
        }

       
    ]
     }
    ],

 });