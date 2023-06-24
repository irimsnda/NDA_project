Ext.define('Admin.view.view.promotionmaterials.views.grids.common.RegisteredPromotionaAdvertAppGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'promotionmaterialviewcontroller',
    xtype: 'registeredpromotionaadvertappgrid',
    itemId: 'registeredpromotionaadvertappgrid',
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

    tbar: [{
        xtype: 'exportbtn'
    }, {
        xtype: 'tbspacer',
        width: 50
    }, 
    ],
    plugins: [
        {
            ptype: 'gridexporter'
        },{
            ptype: 'filterfield'
        }
    ],
    export_title: 'Promotion Material applications',

    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var grid = this.up('registeredpromotionaadvertappgrid'),
                store = grid.store;
                section_id = grid.down('hiddenfield[name=section_id]').getValue();
                    store.getProxy().extraParams = {
                        section_id: section_id
                    };
        }
    }],
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 100,
                storeId: 'registeredproductsstr',
                pageSize: 100,
                remoteFilter: true,
                enablePaging: true,
                proxy: {
                    url: 'promotionmaterials/getRegisteredPromotionMaterialsApps'//getProductApprovalApplications
                }
            },
            isLoad: true
        }
    },
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }], tbar: [{
      xtype:'hiddenfield',
      name:'section_id'  
    },{
        xtype:'hiddenfield',
        name:'status_id'  
      },{
        text: 'Double Click to select application'
    }, '->', {
        xtype: 'combo',
        emptyText: 'Select Search Field',
        name: 'search_field',
        hidden: true,
        valueField: 'description',
        displayField: 'name',
        queryMode: true,
        listeners: {
            afterrender: {
                fn: 'setConfigCombosSectionfilterStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getproductApplicationParameters',
                        extraParams: {
                            table_name: 'par_productapp_searchfilters'
                        }
                    }
                },
                isLoad: true
            }
        }
    }, {
        xtype: 'textfield',
        name: 'search_value',
        allowBlank: false,hidden: true,
        emptyText: 'Enter Search Value'
    }, {
        text: 'Search',hidden: true,
        iconCls: 'fa fa-search', allowBlank: false,
        ui: 'soft-purple',
        handler: 'funcSearchProductApplications'
    }, {
        text: 'Clear',
        iconCls: 'fa fa-cancel',
        ui: 'soft-red',hidden: true,
        handler: 'funcClearSearchApplications'
    }],
    columns: [
        {
            xtype: 'gridcolumn',
            dataIndex: 'certificate_no',
            text: 'MA Number',
            width: 150,
            filter: {
                xtype: 'textfield',
            }
        },{
            xtype: 'gridcolumn',
            dataIndex: 'reference_no',
            text: ' Reference No',
            width: 150,
            filter: {
                xtype: 'textfield',
            }
        }, 
        {
            xtype: 'gridcolumn',
            dataIndex: 'applicant_name',
            text: 'Applicant',
            flex: 1,
            filter: {
                xtype: 'textfield',
            }
        },{
            xtype: 'gridcolumn',
            dataIndex: 'advertisement_type',
            text: 'Advertisement Type',
            flex: 1,
            filter: {
                xtype: 'textfield',
            }
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'description_of_advert',
            text: 'Description of Advertisement',
            flex: 1,
            filter: {
                xtype: 'textfield',
            }
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'venue_of_exhibition',
            text: 'Venue of the Advertisement/Exhibition',
            flex: 1
        },{
            xtype: 'gridcolumn',
            dataIndex: 'exhibition_start_date',
            text: ' Advertisement/Exhibition Start Date',
            flex: 1
        },{
            xtype: 'gridcolumn',
            dataIndex: 'exhibition_start_date',
            text: ' Advertisement/Exhibition End Date',
            flex: 1
        },  {
            xtype: 'gridcolumn',
            dataIndex: 'sponsor_name',
            text: 'Sponsor Name',
            flex: 1,
            filter: {
                xtype: 'textfield',
            }
        }, 	
        {
            xtype: 'gridcolumn',
            dataIndex: 'application_status',
            text: 'Application Status',
            flex: 1,
            tdCls: 'wrap'
        },  {
            xtype: 'gridcolumn',
            dataIndex: 'expiry_date',
            text: 'Expiry Date',
            flex: 1
        }, {
            text: 'Options',
            xtype: 'widgetcolumn',
            width: 90,
            widget: {
                width: 75,
                textAlign: 'left',
                xtype: 'splitbutton',
                iconCls: 'x-fa fa-th-list',
                ui: 'gray',
                menu: {
                    xtype: 'menu',
                    items: [{
                        text: 'Preview Application Details',
                        iconCls: 'x-fa fa-edit',
                        tooltip: 'Preview Record',
                        action: 'edit',
                        childXtype: '',
                        winTitle: 'Promotional & Advertisement Information',
                        winWidth: '40%',
                        isReadOnly: 1,
                        handler: 'showPromotionAndAdvertApplicationMoreDetails'
                    }, {
                        text: 'Application Documents',
                        iconCls: 'x-fa fa-file',
                        tooltip: 'Application Documents',
                        action: 'edit',
                        childXtype: '',
                        winTitle: 'Application Documents',
                        winWidth: '40%',
                        isReadOnly: 1,
                        handler: 'funcPrevGridApplicationDocuments'
                    }
                    ]
                }
            }
        }]
});
