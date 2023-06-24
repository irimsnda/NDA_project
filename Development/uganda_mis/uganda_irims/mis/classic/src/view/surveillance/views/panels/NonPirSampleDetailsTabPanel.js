/**
 * Created by Kip on 3/13/2019.
 */
Ext.define('Admin.view.surveillance.views.panels.NonPirSampleDetailsTabPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'nonpirsampledetailstabpanel',
    itemId: 'pirsampledetailstabpanel',
    controller: 'surveillancevctr',viewModel: 'surveillancevm',
    margin: 1,
    height: 540,
    layout: 'card',
    flex: 1,
    scrollable: true,
    cls: 'wizardthree shadow',
    colorScheme: 'soft-green',

    items: [{
            xtype:'tabpanel',
            title:'Sample Details',
            layout:'fit',
            items:[ {
                title: 'Sample Details',
                xtype: 'sampledetailsfrm',
                itemId: 'sampledetailsfrm'
            },
            {
                title: 'Ingredients',
                xtype: 'pmssampleingredientsgrid',
               // hidden: true,
                listeners:{
                    beforeactivate: function(){
                        var tabPnl=this.up('tabpanel'),
                            sample_id=tabPnl.down('hiddenfield[name=sample_id]').getValue();
                        if(!sample_id){
                            toastr.warning('Please save sample details first!!','Warning Response');
                            return false;
                        }
                    }
                }
            }]

       }
    ],initComponent: function () {
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
            items: [{
                    step: 0,
                    iconCls: 'fa fa-th-large',
                    enableToggle: true,
                    text: 'SAMPLE/PRODUCT COLLECTION DETAILS',
                    action: 'quickNav'
                }
            ]
        };
        
        me.callParent(arguments);
    }

});