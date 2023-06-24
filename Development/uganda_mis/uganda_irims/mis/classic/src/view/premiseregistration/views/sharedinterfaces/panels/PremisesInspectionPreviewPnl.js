Ext.define('Admin.view.premiseregistration.views.sharedinterfaces.panels.PremisesInspectionPreviewPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'premisesinspectionpreviewpnl',
    controller: 'premiseregistrationvctr',
    layout: 'border',
    height: Ext.Element.getViewportHeight() - 118,
    defaults: {
        split: true,
    },
    items: [
        {
            title: 'Premises Inspection Schedules',
            region: 'north',
            height: 250,
            autoScroll: true,
            collapsible: true,
            collapsed: false,
            xtype: 'form',
            layout: 'form',
            defaults: {
                readOnly: true
            },
            items: [
                {
                    xtype: 'datefield',
                    name: 'start_date',
                    fieldLabel: 'Expected Start Date',
                    columnWidth: 0.49,
                    submitFormat: 'Y-m-d',
                    format: 'd/m/Y',
                    altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00',
                    listeners: {
                        change: function(field, newVal, oldVal) {
                            var form = field.up('form'),
                                end_date = form.down('datefield[name=end_date]');
                            end_date.setMinValue(newVal);
                        }
                    }
                },
                {
                    xtype: 'datefield',
                    name: 'end_date',
                    fieldLabel: 'Expected End Date',
                    columnWidth: 0.49,
                    submitFormat: 'Y-m-d',
                    format: 'd/m/Y',
                    altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
                },
                {
                    xtype: 'combo',
                    name: 'inspection_type_id',
                    fieldLabel: 'Inspection Type',
                    columnWidth: 0.49,
                    forceSelection: true,
                    queryMode: 'local',
                    valueField: 'id',
                    displayField: 'name',
                    listeners: {
                        beforerender: {
                            fn: 'setParamCombosStore',
                            config: {
                                pageSize: 100,
                                proxy: {
                                    url: 'commonparam/getCommonParamFromTable',
                                    extraParams: {
                                        table_name: 'par_inspection_types'
                                    }
                                }
                            },
                            isLoad: true
                        }
                    }
                }, {
                    xtype: 'combo',
                    name: 'zone_id',
                    fieldLabel: 'Zone ',
                    columnWidth: 0.49,
                    forceSelection: true,
                    queryMode: 'local',
                    valueField: 'id',
                    displayField: 'name',
                    listeners: {
                        beforerender: {
                            fn: 'setParamCombosStore',
                            config: {
                                pageSize: 100,
                                proxy: {
                                    url: 'commonparam/getCommonParamFromTable',
                                    extraParams: {
                                        table_name: 'par_zones'
                                    }
                                }
                            },
                            isLoad: true
                        }
                    }
                },
                {
                    xtype: 'textarea',
                    name: 'description',
                    fieldLabel: 'Description',
                    columnWidth: 0.99,
                    allowBlank: true
                }, {
                    xtype: 'hiddenfield',
                    name: 'id'
                }
            ]
        },
        {
            title: 'Inspectors',
            xtype: 'grid',
            region: 'center',
            collapsible: false,
            autoScroll: true,
            columns: [{
                xtype: 'gridcolumn',
                dataIndex: 'inspector_name',
                text: 'Name',
                flex: 1,
                tdCls: 'wrap'
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'inspector_role',
                text: 'Role',
                flex: 1,
                tdCls: 'wrap'
            }],
                bbar: [{
                    xtype: 'pagingtoolbar',
                    width: '100%',
                    displayInfo: true,
                    displayMsg: 'Showing {0} - {1} of {2} total records',
                    emptyMsg: 'No Records',
                    beforeLoad: function() {
                        var grid = this.up('grid'),
                            pnl = grid.up('panel'),
                            inspection_id = pnl.down('form').down('hiddenfield[name=id]').getValue(),
                            store = this.getStore();
                        store.getProxy().extraParams = {
                            inspection_id: inspection_id
                        };
                    }
                }],
            features: [{
                ftype: 'searching',
                minChars: 2,
                mode: 'local'
            }],
            listeners: {
                beforerender: {
                    fn: 'setPremiseRegGridsStore',
                    config: {
                        pageSize: 10000,
                        storeId: 'inspectioninspectorspreviewstr',
                        proxy: {
                            url: 'premiseregistration/getInspectionInspectors'
                        }
                    },
                    isLoad: false
                }
            },
        }
    ]
});