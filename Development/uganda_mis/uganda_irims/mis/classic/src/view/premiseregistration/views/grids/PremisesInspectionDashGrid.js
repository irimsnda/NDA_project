/**
 * Created by Softclans on 11/11/2018.
 */
Ext.define('Admin.view.premiseregistration.views.grids.PremisesInspectionDashGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'premiseregistrationvctr',
    xtype: 'premisesinspectiondashgrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        enableTextSelection: true,
        getRowClass: function (record, rowIndex, rowParams, store) {
            var is_enabled = record.get('is_enabled');
            if (is_enabled == 0 || is_enabled === 0) {
                return 'invalid-row';
            }
        }
    },
    export_title: 'Premise Inspection applications',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        store:'premisesinspectiondashgridstr',
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var grid = this.up('grid'),
                store = this.getStore(),
                inspection_type_id = grid.down('combo[name=inspection_type_id]').getValue(),
                from_user_id = grid.down('combo[name=from_user_id]').getValue(),
                to_user_id = grid.down('combo[name=to_user_id]').getValue(),
                region_id = grid.down('combo[name=region_id]').getValue(),
                application_status_id = grid.down('combo[name=application_status_id]').getValue();

            store.getProxy().extraParams = {
                inspection_type_id: inspection_type_id,
                from_user_id: from_user_id,
                to_user_id: to_user_id,
                region_id: region_id,
                application_status_id: application_status_id
            }
        }
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }, {
        ftype: 'grouping',
        startCollapsed: true,
        groupHeaderTpl: '{[values.rows[0].data.workflow_stage]} Inspection Details: {[values.rows[0].data.inspection_reference_no]} {[values.rows[0].data.inspection_description]}   [{rows.length} {[values.rows.length > 1 ? "Applications" : "Application"]}]',
        hideGroupedHeader: true,
        enableGroupingMenu: false
    }],
    plugins: [{
            ptype: 'gridexporter'
         },{
            ptype: 'filterfield'
       }],
    
    listeners: {
        beforerender: function () {
            var store = this.store;
            store.removeAll();
            store.load();
        },
        itemdblclick: 'onViewPremiseApplication'
    },
    store: 'premisesinspectiondashgridstr',
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'inspection_description',
        text: 'Inspection Name',
        width: 200,
        tdCls: 'wrap',
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'inspection_type',
        text: 'Inspection Type',
        width: 200,
        tdCls: 'wrap',
        filter: {
            xtype: 'combo',
            name: 'inspection_type_id',
            valueField: 'id',
            displayField: 'name',
            queryMode: 'local',
            listeners: {
                beforerender: {
                    fn: 'setPremiseRegCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'inspection_types'
                            }
                        }
                    },
                    isLoad: true
                },
                change: function(){
                    this.up('grid').getStore().reload();
                }
               
            }
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        text: 'Ref Number',
        width: 200,
        tdCls: 'wrap',
        filter: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'process_name',
        text: 'Process',
        width: 200,
        tdCls: 'wrap',
        hidden: true
    }, {
        xtype: 'gridcolumn',
        text: 'From',
        dataIndex: 'from_user',
        width: 200,
        tdCls: 'wrap',
        filter: {
            xtype: 'combo',
            name: 'from_user_id',
            valueField: 'id',
            displayField: 'name',
            queryMode: 'local',
            listeners: {
                beforerender: {
                    fn: 'setPremiseRegCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'usermanagement/getUserList'
                        }
                    },
                    isLoad: true
                },
                change: function(){
                    this.up('grid').getStore().reload();
                }
               
            }
        }
    }, {
        xtype: 'gridcolumn',
        text: 'To',
        dataIndex: 'to_user',
        width: 200,
        tdCls: 'wrap',
        filter: {
            xtype: 'combo',
            name: 'to_user_id',
            valueField: 'id',
            displayField: 'name',
            queryMode: 'local',
            listeners: {
                beforerender: {
                    fn: 'setPremiseRegCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'usermanagement/getUserList'
                        }
                    },
                    isLoad: true
                },
                change: function(){
                    this.up('grid').getStore().reload();
                }
               
            }
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'applicant_name',
        text: 'Applicant',
        width: 200,
        tdCls: 'wrap',
        filter: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'premise_name',
        text: 'Premise',
        tdCls: 'wrap',
        filter: {
            xtype: 'textfield'
        },
       width: 200,
       tdCls: 'wrap',
    },{
        xtype: 'gridcolumn',
        dataIndex: 'region_name',
        text: 'Region Name',
        tdCls: 'wrap',
        filter: {
            xtype: 'combo',
            name: 'region_id',
            valueField: 'id',
            displayField: 'name',
            queryMode: 'local',
            listeners: {
                beforerender: {
                    fn: 'setPremiseRegCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_regions'
                            }
                        }
                    },
                    isLoad: true
                },
                change: function(){
                    this.up('grid').getStore().reload();
                }
               
            }
        },
       width: 200,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'physical_address',
        text: 'Premises Physical Address',
        tdCls: 'wrap',
        filter: {
            xtype: 'textfield'
        },
       width: 200,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'workflow_stage',
        text: 'Workflow Stage',
        width: 200,
        filter: {
            xtype: 'textfield'
        },
        tdCls: 'wrap'
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'application_status',
        text: 'Application Status',
        width: 200,
        filter: {
            xtype: 'combo',
            name: 'application_status_id',
            valueField: 'id',
            displayField: 'name',
            queryMode: 'local',
            listeners: {
                beforerender: {
                    fn: 'setPremiseRegCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_system_statuses'
                            }
                        }
                    },
                    isLoad: true
                },
                change: function(){
                    this.up('grid').getStore().reload();
                }
               
            }
        },
        tdCls: 'wrap'
    }]
});
