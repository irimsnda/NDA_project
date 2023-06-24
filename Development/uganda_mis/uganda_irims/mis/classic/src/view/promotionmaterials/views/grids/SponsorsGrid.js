Ext.define('Admin.view.promotionmaterials.views.maininterfaces.grids.SponsorsGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'sponsorsgrid',
	controller:'promotionmaterialviewcontroller',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    frame:true,
    height: 550,
    applicantType:'nonlocal',
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
    tbar:[
        {
            xtype: 'tbspacer',
            width: 20
        },
		{
        xtype: 'button',
        text: 'Add',
        iconCls: 'x-fa fa-plus',
        ui: 'soft-green',
        name: 'add_details',
        handler: 'showAddSponsorForm',
        winTitle: 'Sponsors Particulars',
        childXtype: 'sponsorform',
        winWidth: '35%',
        stores: '[]'
       },
        {
            xtype: 'displayfield',
            value: 'Double click to select!!',
            fieldStyle: {
                'color':'green'
            }
        }
    ],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad:function(){
            this.fireEvent('refreshApplicantselectioncmngrid', this);
        }
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
	listeners: {
        beforerender: {
            fn: 'showPromotionAdvertsRegWorkflow',
            config: {
                pageSize: 10000,
                proxy: {
                     url: 'promotionmaterials/getSponsorsList'
                }
            },
            isLoad: true
        }
        },
   /*  storeConfig:{
        config: {
            pageSize: 10000,
            proxy: {
                url: 'promotionmaterials/getSponsorsList'
            }
        },
        isLoad: true
    }, */
    columns: [
	{
		xtype: 'gridcolumn',
		dataIndex:'id',
		hidden:true
	},
	
	{
        xtype: 'gridcolumn',
        dataIndex: 'name',
        text: 'Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'contact_person',
        text: 'Contact Person',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'physical_address',
        text: 'Physical Address',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'postal_address',
        text: 'Postal Address',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'tin_no',
        text: 'TIN',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'telephone_no',
        text: 'Telephone',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'email',
        text: 'Email',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'fax',
        text: 'Fax',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'website',
        text: 'Website',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'country_name',
        text: 'Country',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'region_name',
        text: 'Region',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'district_name',
        text: 'District',
        flex: 1
    },
	
    {
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
                    text: 'Edit',
                    iconCls: 'x-fa fa-edit',
                    tooltip: 'View Task',
                    action: 'edit',
                    handler: 'editSponsorsForm',
                    stores: '[]',
					bind: {
                                disabled: '{readOnly}'
                            },
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'tra_promotionaladvert_personnel',
                    //storeID: 'promotionmaterialproductparticularstr',
                    action_url: 'promotionmaterials/genericDeleteRecord',
                    action: 'actual_delete',
                    handler: 'deleteRecordAdvanced',
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete'),
					bind: {
                                disabled: '{readOnly}'
                            },
                }
                ]
            }
        }
    }
	
	
	
	
	
	
	
	
	]
});
