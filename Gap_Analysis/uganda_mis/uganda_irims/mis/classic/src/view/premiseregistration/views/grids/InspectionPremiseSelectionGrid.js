/**
 * Created by Kip on 11/22/2018.
 */
Ext.define('Admin.view.premiseregistration.views.grids.InspectionPremiseSelectionGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'premiseregistrationvctr',
    xtype: 'inspectionpremiseselectiongrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    frame: true,
    height: 550,
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
    tbar: [{
            text:'Add New Premises Details',
            iconCls:'fa fa-plus',
            ui:'soft-green',
            childXtype:'premiseaddnewdetailsfrm',
            winTitle:'New premises Details',
            winWidth:'70%',
            handler:'funcAddWinNewPremisesDetails'
    },
        {
            xtype: 'tbspacer',
            width: 20
        },
        
        {
            xtype: 'hiddenfield',
            name: 'section_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'gmp_type_id'
        }
    ],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '80%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var store = this.getStore(),
                grid = this.up('grid'),
                section_id = grid.down('hiddenfield[name=section_id]').getValue();
            store.getProxy().extraParams = {
                section_id: section_id
            };
        }
    },{
        text: 'Link Selected Premises',
        iconCls:'x-fa fa-check',
        margin:5,
        ui: 'soft-purple',
        name: 'addregpremisesbtn'
    },],
    /* features: [{
         ftype: 'searching',
         minChars: 2,
         mode: 'local'
     }],*/
    plugins: [{
        ptype: 'filterfield'
    }],
    listeners: {
        beforerender: {
            fn: 'setPremiseRegGridsStore',
            config: {
                pageSize: 100,
                remoteFilter: true,
                totalProperty: 'totalCount',
                storeId:'inspectionpremiseselectionstr',
                proxy: {
                    url: 'premiseregistration/getAllPremisesList',

					reader: {
                        type: 'json',
                        totalProperty: 'totalCount',
                        root: 'results'
                    }
                }
            },
            isLoad: true
        }
    },selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI',
        allowDeselect: true
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'name',
        text: 'Premise Name',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'applicant_name',
        text: 'Applicant Name',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'premise_reg_no',
        text: 'Registration No',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'permit_no',
        text: 'Permit No',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'region_name',
        text: 'Region Name',
        flex: 1,
		filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'district_name',
        text: 'District Name',
        flex: 1,
		filter: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'physical_address',
        text: 'Physical Address',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'postal_address',
        text: 'Postal Address',
        flex: 1
    }]
});
