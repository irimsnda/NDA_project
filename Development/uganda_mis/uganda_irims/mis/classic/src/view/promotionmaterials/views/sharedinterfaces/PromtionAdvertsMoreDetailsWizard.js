Ext.define('Admin.view.promotionmaterials.views.sharedinterfaces.PromtionAdvertsMoreDetailsWizard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.promtionadvertsmoredetailswizard',
	controller: 'promotionmaterialviewcontroller',
	viewModel:'promotionmaterialsviewmodel',
    padding: '2 0 2 0',
    requires: [
        'Ext.layout.container.*',
        'Ext.toolbar.Fill'
    ],
    reference: 'wizardpnl',
    layout: 'card',
    //bodyPadding: 3,
    flex: 1,
    autoScroll: true,
    cls: 'wizardthree shadow',
    colorScheme: 'soft-green',
	
	dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            ui: 'footer',
            height: 35,
            defaults: {
                labelAlign: 'right',
                labelStyle: "color:#595959"
            },
            items: ['->',{
                    xtype: 'tbspacer',
                    width: 20
                }, {
                    xtype: 'displayfield',
                    name: 'application_status',
                    fieldLabel: 'App Status',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                        'font-size': '14px'
                    }
                }, {
                    xtype: 'tbspacer',
                    width: 20
                }, 
				{
                    xtype: 'displayfield',
                    name: 'tracking_no',
                    fieldLabel: 'Tracking No',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                        'font-size': '14px'
                    }
                }] 
        }
    ],
	

    items: [
        {
            xtype: 'tabpanel',
            layout: 'fit',

            defaults: {
                margin: 3
            },
            items: [{
                xtype: 'promotionalapplicantdetailsfrm',
                title: 'APPLICANT DETAILS'
            },{
                xtype: 'promLocalapplicantdetailsfrm',
                title: 'LOCAL TECHNICAL REPRESENTATIVE DETAILS'
            },{
                xtype: 'promotionalappdetailsfrm',
                title: 'Application Details'
            }]
        },
        {
            xtype: 'promotiommaterialproductgrid',
            title: 'Product Particulars',
            listeners: {
                beforerender: {
                    fn: 'setCustomPromotionMaterialGridsStore',
                    config: {
                       
                        storeId:'promotionmaterialproductparticularstr',
                        proxy: {
                            url: 'promotionmaterials/getPromotionMaterialsProductParticular'
                        }
                    },
                    isLoad: true
                },
            },
        },
		
		
		  {
               xtype: 'hiddenfield',
               name: 'active_application_code'
          },
		 {
            xtype: 'hiddenfield',
            name: 'active_application_id'
        },
		{
            xtype: 'hiddenfield',
            name: 'application_status_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'process_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'workflow_stage_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'application_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'module_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'sub_module_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'section_id'
        },
		{
            xtype: 'hiddenfield',
            name: 'is_portal',
			value:0
        },
		{
            xtype: 'hiddenfield',
            name: 'is_read_only',
			value:1
        }
    ],

    initComponent: function () {
        var me = this;
        this.tbar = {
            reference: 'progress',
            itemId: 'progress_tbar',
            defaultButtonUI: 'wizard-' + this.colorScheme,
            cls: 'wizardprogressbar',
            bodyStyle: {
                "background-color": "red"
            },
            layout: {
                pack: 'center'
            },
            items: [
                {
                    step: 0,
                    iconCls: 'fa fa-user',
                    enableToggle: true,
                    pressed: true,
                    text: 'Applicant Details',
                    action: 'quickNav',
                    handler: 'quickNavigationMoreDetails'
                },
                {
                    step: 1,
                    iconCls: 'fa fa-university',
                    enableToggle: true,
                    text: 'Products Particulars',
                    action: 'quickNav',
                    handler: 'quickNavigationMoreDetails'
                }
				
            ]
        };
        this.bbar = {
            reference: 'navigation-toolbar',
            ui: 'footer',
            items: [
                {
                    text: 'Previous',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-arrow-left',
                    bind: {
                        disabled: '{atBeginning}'
                    },
                    handler: 'onPrevCardClickMoreDetails'
                },
                '->',
               {
					hidden:true,
                    text: 'Receive Application',
                    ui: 'soft-purple',
                    iconCls: 'x-fa fa-thumbs-up',
                    name: 'receive_btn',
                    handler: 'receiveOnlineApplicationDetailsFrmBtn',
                    storeID: 'onlinepremregistrationstr',
                    winWidth: '50%',
                    bind: {
                        disabled: '{!atEnd}'
                    }
                },
                {
					hidden:true,
                    text: 'Query Application',
                    ui: 'soft-purple',
                    iconCls: 'x-fa fa-sliders',
                    name: 'query_btn',
                    handler: 'queryOnlineApplicationFrmBtn',
                    bind: {
                        disabled: '{!atEnd}'
                    }
                },
                {
					hidden:true,
                    text: 'Reject Application',
                    ui: 'soft-purple',
                    iconCls: 'x-fa fa-thumbs-down',
                    name: 'reject_btn',
                    handler: 'submitRejectedOnlineApplicationFrmBtn',
                    bind: {
                        disabled: '{!atEnd}'
                    }
                },
			  
			  
			  
			  
			  
			  
                {
                    text: 'Next',
                    ui: 'soft-purple',
                    reference: 'nextbutton',
                    iconCls: 'fa fa-arrow-right',
                    iconAlign: 'right',
                    bind: {
                        disabled: '{atEnd}'
                    },
                    handler: 'onNextCardClickMoreDetails'
                }
            ]
        };
        me.callParent(arguments);
    }
});
