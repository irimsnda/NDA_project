Ext.define('Admin.view.summaryreport.registeredapplicationreport.views.grid.RegisteredApplicationsGrid',{
	extend: 'Ext.grid.Panel',
	xtype: 'registeredApplicationsGrid',
	width: '100%',
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 100,
                storeId: 'registeredapplicationsstr',
                remoteFilter: true,
                grouper: {
                    groupFn: function (item) {
                        return item.get('section_name') + item.get('sub_module_name');
                    }
                },
                proxy: {
                    url: 'summaryreport/getregisteredApplicationsGridReports'
                }
            },
            isLoad: false
        }
           
    },
	columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'applicant_name',
        name: 'applicant_name',
        text: 'Applicant',
        width: 150
    },{
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        name: 'reference_no',
        text: 'Reference No',
        width: 150
	},{
        xtype: 'gridcolumn',
        dataIndex: 'tracking_no',
        name: 'tracking_no',
        text: 'Tracking No',
        width: 150
    },{
        xtype: 'gridcolumn',
        dataIndex: 'certificate_no',
        name: 'certificate_no',
        text: 'Certificate No',
        width: 150
    },{
        xtype: 'gridcolumn',
        dataIndex: 'certificate_issue_date',
        name: 'certificate_issue_date',
        text: 'Certificate Issue Date',
        width: 200,
        filter: {
            xtype: 'datefield',
            format: 'y-m-d'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'expiry_date',
        name: 'expiry_date',
        text: 'Expiry Date',
        width: 150,
        filter: {
            xtype: 'datefield',
            format: 'y-m-d'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'approval_date',
        name: 'approval_date',
        text: 'Approval Date',
        width: 150,
        filter: {
            xtype: 'datefield',
            format: 'y-m-d'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'registration_status',
        name: 'registration_status',
        text: 'Registration Status',
        width: 150,
        filter: {
                    xtype: 'combobox',
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    name: 'registration_status_id',
                    listeners:
                     {
                         beforerender: {//getConfigParamFromTable
                            fn: 'setConfigCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'configurations/getConfigParamFromTable',
                                     extraParams: {
                                        table_name: 'par_registration_statuses'
                                    }   
                                }
                            },
                            isLoad: true,
                        },
                        change: function(combo) {
                            var grid = this.up('grid'),
                                store = grid.getStore();
                                store.reload();
                        },          
                 }
                
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'validity_status',
        name: 'validity_status',
        text: 'Validity Status',
        width: 150,
        filter: {
                    xtype: 'combobox',
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    name: 'validity_status_id',
                    listeners:
                     {
                         beforerender: {//getConfigParamFromTable
                            fn: 'setConfigCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'configurations/getConfigParamFromTable',
                                     extraParams: {
                                        table_name: 'par_validity_statuses'
                                    }   
                                }
                            },
                            isLoad: true,
                        },
                        change: function(combo) {
                            var grid = this.up('grid'),
                                store = grid.getStore();
                                store.reload();
                        }, 
                 }
                
            }
    }

    ],
    features: [
        {
            ftype: 'grouping',
            startCollapsed: true,
            groupHeaderTpl: 'Process: {[values.rows[0].data.section_name]}, Sub-Module: {[values.rows[0].data.sub_module_name]} [{rows.length} {[values.rows.length > 1 ? "Items" : "Item"]}]',
           // hideGroupedHeader: true,
           // enableGroupingMenu: false
        }
    ],
    plugins: [{
        ptype: 'filterfield'
    },{
        ptype: 'gridexporter'
    }],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '70%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} out of {2}',
        emptyMsg: 'No Records',
        beforeLoad: function() {
        		var grid=this.up('grid'),
        			pnl=grid.up('panel'),
        			filter=pnl.up('panel'),
        		       sub_module_id = filter.down('combo[name=sub_module_id]').getValue(),
			           module_id = filter.down('combo[name=module_id]').getValue(),
			           section_id = filter.down('combo[name=section_id]').getValue(),
                       validity_status_id = grid.down('combo[name=validity_status_id]').getValue(),
                       registration_status_id = grid.down('combo[name=registration_status_id]').getValue(),
			           registration_date = filter.down('combo[name=registration_date]').getValue(),
                       approval_opt = filter.down('combo[name=approval_opt]').getValue(),
			           expiry_date = filter.down('combo[name=expiry_date]').getValue(),
			           from_date = filter.down('datefield[name=from_date]').getValue(),
			           to_date = filter.down('textfield[name=to_date]').getValue();

        		 var store=this.getStore();
        		 store.getProxy().extraParams = {
                        sub_module_id:sub_module_id,
                        section_id: section_id,
                        module_id:module_id,
                        from_date: from_date,
                        registration_date: registration_date,
                        approval_opt: approval_opt,
                        expiry_date: expiry_date,
                        to_date: to_date,
                        validity_status_id:validity_status_id,
                        registration_status_id:registration_status_id

                }
                
        	},

        
        
    },'->',
    {
        xtype: 'exportbtn',
        text: 'Print(Summary)'
    }]

    });