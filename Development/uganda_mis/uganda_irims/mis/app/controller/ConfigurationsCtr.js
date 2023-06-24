/**
 * Created by Kip on 9/27/2018.
 */
Ext.define('Admin.controller.ConfigurationsCtr', {
    extend: 'Ext.app.Controller',
    stores:[
        'Admin.store.configurations.ConfigGridAbstractStore',
        'Admin.store.configurations.ConfigComboAbstractStore',
        'Admin.store.MigrationDataTypeStr',
        'Admin.store.Misv1TablesListStr',
        
    ],
    config: {
        refs: [{
            ref: 'mainPanel',
            selector: 'maincontainerwrap'
        }, {
            ref: 'mainTabPanel',
            selector: '#contentPanel'
        }, {
            ref: 'sampleanalysistestrequestspnl',
            selector: '#sampleanalysistestrequestspnl'
        }, {
            ref: 'productsSampledetailsFrm',
            selector: '#productsSampledetailsFrm'
        }]

    },
    control:{
        'migrationsetupgrid': {
            afterrender: 'preparemigrationsetupgrid'
        }
    },
    init: function() {
        
    },
    
    listen: {
        controller: {
            '*': {
                setConfigGridsStore: 'setConfigGridsStore',
                setConfigCombosStore: 'setConfigCombosStore',
                setConfigCombosStoreWithSectionFilter:'setConfigCombosStoreWithSectionFilter',
                setConfigCombosSampleSectionfilterStore:'setConfigCombosSampleSectionfilterStore',
                setConfigCombosProdSampleSectionfilterStore:'setConfigCombosProdSampleSectionfilterStore',
                setConfigCombosProdSampleNonfilterStore:'setConfigCombosProdSampleNonfilterStore',
                setConfigCombosProductfilterStore:'setConfigCombosProductfilterStore',
                setTraderConfigCombosStore: 'setTraderConfigCombosStore',
                setReportGlobalStoreWithTBar: 'setReportGlobalStoreWithTBar',
                setApplicationAuditReportGlobalStore: 'setApplicationAuditReportGlobalStore'
            }
        }
    },
    preparemigrationsetupgrid:function(){
            var store = Ext.getStore('misv1tablesliststr');
            store.load();
            var store = Ext.getStore('migrationdatatypestr');
            store.load();
            

    },
    setConfigGridsStore: function (me, options) {
        var config = options.config,
            isLoad = options.isLoad,
            toolbar = me.down('pagingtoolbar'),
            store = Ext.create('Admin.store.configurations.ConfigGridAbstractStore', config);
        me.setStore(store);
        toolbar.setStore(store);
        if (isLoad === true || isLoad == true) {
            store.removeAll();
            store.load();
        }
    },
    setReportGlobalStoreWithTBar: function (me, options) {
        var config = options.config,
            isLoad = options.isLoad,
            toolbar = me.down('pagingtoolbar'),
            store = Ext.create('Admin.store.summaryreport.ReportsGlobalAbstractStr', config);
        me.setStore(store);
        toolbar.setStore(store);
        if (isLoad === true || isLoad == true) {
            store.removeAll();
            store.load();
        }
    },
    setApplicationAuditReportGlobalStore: function (me, options) {
        var config = options.config,
            isLoad = options.isLoad,
            toolbar = me.down('pagingtoolbar'),
            store = Ext.create('Admin.store.audit_trail.ApplicationAuditReportAbstractStr', config);
        me.setStore(store);
        toolbar.setStore(store);
        if (isLoad === true || isLoad == true) {
            store.removeAll();
            store.load();
        }
    },
    setConfigCombosStore: function (me, options) {
        var config = options.config,
            isLoad = options.isLoad,
            store = Ext.create('Admin.store.configurations.ConfigComboAbstractStore', config);
        me.setStore(store);
        if (isLoad === true || isLoad == true) {
            store.removeAll();
            store.load();
        }
    },

    setConfigCombosSampleSectionfilterStore: function (me, options) {
        var config = options.config,
            isLoad = options.isLoad,
            sample_pnl = this.getSampleanalysistestrequestspnl(),
            section_id = sample_pnl.down('hiddenfield[name=section_id]').getValue(),
            filters = {section_id:section_id},
            filters = JSON.stringify(filters),
            store = Ext.create('Admin.store.configurations.ConfigComboAbstractStore', config);
        me.setStore(store);
        if (isLoad === true || isLoad == true) {
            store.removeAll();
            store.load({params:{filters:filters} });
        }
    },
	setConfigCombosProdSampleSectionfilterStore: function (me, options) {
        var config = options.config,
            isLoad = options.isLoad,
            sample_pnl = this.getProductsSampledetailsFrm(),
            section_id = sample_pnl.down('hiddenfield[name=section_id]').getValue(),
            filters = {section_id:section_id},
            filters = JSON.stringify(filters),
            store = Ext.create('Admin.store.configurations.ConfigComboAbstractStore', config);
        me.setStore(store);
        if (isLoad === true || isLoad == true) {
            store.removeAll();
            store.load({params:{filters:filters} });
        }
    },
	setConfigCombosProdSampleNonfilterStore: function (me, options) {
       var config = options.config,
            isLoad = options.isLoad,
            store = Ext.create('Admin.store.configurations.ConfigComboAbstractStore', config);
        me.setStore(store);
            store.removeAll();
            store.load();
		
    },
    setConfigCombosStoreWithSectionFilter: function (me, options) {
        var config = options.config,
            isLoad = options.isLoad,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            
            store = Ext.create('Admin.store.configurations.ConfigComboAbstractStore', config);
            me.setStore(store);

            if(me.up('window')){
                win = me.up('window');
                if(win.down('hiddenfield[name=section_id]')){
                    section_id = win.down('hiddenfield[name=section_id]').getValue();
                }
                else{
                    section_id = activeTab.down('hiddenfield[name=section_id]').getValue();
                }
               
            }
            else{
                section_id = activeTab.down('hiddenfield[name=section_id]').getValue();
               
            } 
            if(section_id >0){
                var filters = {section_id:section_id},
                filters = JSON.stringify(filters);
                if (isLoad === true || isLoad == true) {
                    store.removeAll();
                    store.load({params:{filters:filters} });
                }
            }
            else{
                if (isLoad === true || isLoad == true) {
                    store.removeAll();
                    store.load();
                }
            }
            
           
        
    },
    setTraderConfigCombosStore: function (me, options) {
        var config = options.config,
            isLoad = options.isLoad,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            applicant_id = activeTab.down('hiddenfield[name=applicant_id]').getValue(),
            filters = {trader_id:applicant_id},
            filters = JSON.stringify(filters),
            store = Ext.create('Admin.store.configurations.ConfigComboAbstractStore', config);
            me.setStore(store);
        if (isLoad === true || isLoad == true) {
            store.removeAll();
            store.load({params:{filters:filters} });
        }
    },
    setConfigCombosProductfilterStore: function (me, options) {
        var config = options.config,
            isLoad = options.isLoad,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            product_id = activeTab.down('hiddenfield[name=product_id]').getValue(),
            filters = {product_id:product_id},
            filters = JSON.stringify(filters),

            store = Ext.create('Admin.store.configurations.ConfigComboAbstractStore', config);
            me.setStore(store);
            
        if (isLoad === true || isLoad == true) {
            store.removeAll();
            store.load({params:{filters:filters} });
        }
    }

});