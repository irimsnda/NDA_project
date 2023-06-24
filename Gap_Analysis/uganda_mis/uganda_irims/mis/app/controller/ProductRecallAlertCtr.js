
/**
 * created by TMDA team
 * user Dr. Masuke and Eng. Sadam 
 * 
 * created on 18/05/2021
 */
 Ext.define('Admin.controller.ProductRecallAlertCtr', {
    extend: 'Ext.app.Controller',
    stores: ['Admin.store.productrecallalert.ProductRecallAlertStr'],
    config: {
        refs: [{
            ref: 'mainPanel',
            selector: 'maincontainerwrap'
        }, {
            ref: 'mainTabPanel',
            selector: '#contentPanel'
        }],
        control: {
            'productRecallAlertTb button[name=productRecallAlertHomeBtn]': {
                click: 'productRecallAlertHome'
            },
            'allproductrecallbatchessgrid button[name=btnselectbatches]': {
                click: 'funLinkBatchPoeApplicationDetails'
            }

        }
    },
    
    /**
     * Called when the view is created
     */
     init: function () {

    },

    listen: {
        controller: {
            '*': {
                onNewProductRecallAlert: 'onNewProductRecallAlert',
                setConfigCombosStoreWithThscpFilter: 'setConfigCombosStoreWithThscpFilter',
            }
        }
    },

    onNewProductRecallAlert: function (application_type, btn) {
        
       
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            dashboardWrapper = activeTab.down('#productRecallAlertDashWrapper'),
            winTitle = btn.winTitle;

        dashboardWrapper.removeAll();
        var workflowContainer = Ext.widget(btn.childXtype);

        dashboardWrapper.add(workflowContainer);
        
        Ext.Function.defer(function () {
            Ext.getBody().unmask();
        }, 300);

        //load the stores

    },

    productRecallAlertHome: function (btn) {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            sec_dashboard = btn.sec_dashboard,
            activeTab = mainTabPanel.getActiveTab(),
            dashboardWrapper = activeTab.down('#productRecallAlertDashWrapper');
        if (!dashboardWrapper.down(sec_dashboard)) {
            dashboardWrapper.removeAll();
            dashboardWrapper.add({xtype: sec_dashboard});
        }
    },

    
    setConfigCombosStoreWithThscpFilter: function (me, options) {
        var config = options.config,
            isLoad = options.isLoad,
            store = Ext.create('Admin.store.configurations.ConfigComboAbstractStore', config);
            me.setStore(store);
                
        if (isLoad === true || isLoad == true) {
            store.removeAll();
            store.load();
        }
    },
    funLinkBatchPoeApplicationDetails:function(btn){
        var me = this,
            grid = btn.up('grid'),
            window = grid.up('window'),
            sm = grid.getSelectionModel(),
            selected_records = sm.getSelection(),
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            product_pnl = activeTab.down('#productRecallAlertDashWrapper'),
            product_form = product_pnl.down('#ProductRecallAlertFrm');
            
            var index = 0, batch_found = false, batch_number = '', poe_application_id_array = rec_batch_array = new Array();
            Ext.each(selected_records, function (item) {
                poe_application_id_array[index] = item.data.tra_poe_permitsdata_id;               
                
                if(!batch_found){
                    rec_batch_array = item.data.batch_numbers.split(',');
                    if(rec_batch_array.length == 1){
                        bactch_found = true;
                        batch_number = rec_batch_array[0];
                    }
                }
                
                index ++;              
            });

            if(!batch_found){
                batch_number = selected_records[index - 1].data.batch_numbers;
            }

            
            product_form.down('hiddenfield[name=tra_poe_permitsdata_id]').setValue(Ext.encode(poe_application_id_array));
            product_form.down('textfield[name=batch_number]').setValue(batch_number);
            
            window.close();
    },



    
});