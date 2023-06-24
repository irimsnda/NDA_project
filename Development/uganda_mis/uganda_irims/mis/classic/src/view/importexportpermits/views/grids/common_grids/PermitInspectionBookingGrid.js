
/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.importexportpermits.views.grids.common_grids.PermitInspectionBookingGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'importexportpermitsvctr',
    xtype: 'permitinspectionbookinggrid',
    itemId: 'permitinspectionbookinggrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var is_enabled = record.get('is_enabled');
            if (is_enabled == 0 || is_enabled === 0) {
                return 'invalid-row';
            }
        }
    },
    plugins: [
        {
            ptype: 'gridexporter'
        },{
            ptype: 'filterfield'
        }
    ],
    tbar:[{
        xtype: 'form',
        ui: 'footer',
        style :'margin-bottom: 0px;',
        width: '100%',
        layout: {
            type:'column',
            columnWidth: 0.33
        },
        defaults:{
          bodyPadding: 1,
          labelAlign:'top',
          width: 320,
          margins: 5
          },
         items: [{
            xtype: 'combo',
            fieldLabel: 'Sub Module',
            labelWidth: 80,
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
                                model_name: 'SubModule',
                                module_id: 20
                            }
                        }
                    },
                    isLoad: true
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
        },{
            xtype: 'combo',
            fieldLabel: 'Inspection Booking Status',
            labelWidth: 80,
            valueField: 'id',
            displayField: 'name',
            forceSelection: true,
            name: 'inspectionbooking_status_id',
            emptyText:'All Inspection Bookings',
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
                            url: 'configurations/getNonrefParameter',
                            extraParams: {
                                table_name: 'tesws_inspectionbooking_statuses'
                            }
                        }
                    },
                    isLoad: true
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
        },{ 
                xtype:'datefield',format:'Y-m-d',
                name: 'booking_from',
                fieldLabel:'Booking From'
            },{ 
                xtype:'datefield',
                name: 'booking_to',format:'Y-m-d',
                fieldLabel:'Booking To'
            }],
            buttons:[{
                ui:'soft-green',
                text:'Filter Permits',
                margin: 5,
                handler: 'funcFilterPermitsdeclarations'
            },{
                ui:'soft-red',
                text:'Clear Filter',
                margin: 5,
                handler: 'funcClearFilterPermitsdeclarations'
            }]
    }],
   
    export_title: 'Permits applications',
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    },{
        ftype:'grouping',
        enableGroupingMenu: true,
        groupHeaderTpl: 'Booking Status: {[values.rows[0].data.inspectionbookingstatus]} [{rows.length} {[values.rows.length > 1 ? "Items" : "Item"]}]',
    }],
    
    columns: [{
        xtype: 'widgetcolumn',
        width: 120,
        widget: {
            width: 120,
            textAlign: 'left',
            xtype: 'button',
            ui: 'soft-green',
            text: 'Confirm Inspection Booking ',
            iconCls: 'x-fa fa-edit',
            name: 'confirm_inspection',
            handler: 'funcConfirmInspectionBooking'
        }
    },{
        xtype: 'widgetcolumn',
        width: 120,
        hidden: true,
        widget: {
            width: 120,
            textAlign: 'left',
            xtype: 'button',
            ui: 'soft-green',
            text: 'POE(Consignment) Inspection Details',
            iconCls: 'x-fa fa-edit',
            name: 'confirm_inspection',
            handler: 'funcConsignementInspectionDetails'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'referenceNumber',
        text: 'Declaration Reference No',
        tdCls:'wrap-text',
        flex: 1,filter: {
            xtype: 'textfield'
        },
    },{
        xtype: 'gridcolumn',
        dataIndex: 'permitsubmission_status',
        text: 'Permits Submission Status',
        tdCls:'wrap-text',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        text: 'Reference Number',
        tdCls:'wrap-text',  width:250,
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'applicant_name',
        text: 'Applicant Name',
        tdCls:'wrap-text',
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'tansadNo',
        width:300,
        text: 'tansad Number', tdCls:'wrap-text',
      
        filter: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'bookingId',  width:250,
        text: 'Booking Id', tdCls:'wrap-text',
        flex: 1,filter: {
            xtype: 'textfield'
        },
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'containerCount',
        text: 'container Count', tdCls:'wrap-text',
        flex: 1
        
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'containerList',
        text: 'Container List', tdCls:'wrap-text',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'confimedBookedDate',
        text: 'confimedBookedDate', tdCls:'wrap-text',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        text: 'Size',
        dataIndex: 'size', tdCls:'wrap-text',
        flex: 1,
        tdCls: 'wrap'
    }, {
        xtype: 'gridcolumn',
        text: 'Cargo Keeper', tdCls:'wrap-text',
        dataIndex: 'cargoKeeper',
        flex: 1,
        tdCls: 'wrap'
    },
    {
        xtype: 'gridcolumn',
        text: 'Station', tdCls:'wrap-text',
        dataIndex: 'station',
        flex: 1,
        tdCls: 'wrap'
    },
    {
        xtype: 'gridcolumn',
        text: 'Inspection Booking Status', tdCls:'wrap-text',
        dataIndex: 'inspectionbookingstatus',
        flex: 1,
        tdCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        text: 'Booking Confirmed By', tdCls:'wrap-text',
        dataIndex: 'bookingconfirmedby',
        flex: 1,
        tdCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        text: 'Booking Confirmed On', tdCls:'wrap-text',
        dataIndex: 'bookingconfirmedon',
        flex: 1,
        tdCls: 'wrap'
    }],
    listeners: {
       
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 100,
                groupField:'permitsubmission_status',
                storeId: 'permitinspectionbookingdashboardstr',
                enablePaging: true,
                remoteFilter: true,
                proxy: {
                    url: 'importexportpermits/getpermitinspectionbookingdashboardstr',
                    reader: {
                        type: 'json',
                        rootProperty: 'results',
                        totalProperty: 'totals'
                    }
                }
            },
            isLoad: true,
            autoLoad: true
        }
    },
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad:function(){

            var grid = this.up('grid'),
              sub_module_id = grid.down('combo[name=sub_module_id]').getValue(),
              booking_from = grid.down('datefield[name=booking_from]').getValue(),
              booking_to = grid.down('datefield[name=booking_to]').getValue(),
              store = grid.getStore(); 
            store.removeAll();
            store.getProxy().extraParams = {
                  'sub_module_id': sub_module_id,
                  'booking_from': booking_from,
                  'booking_to': booking_to
            }
      }
    }]
});
